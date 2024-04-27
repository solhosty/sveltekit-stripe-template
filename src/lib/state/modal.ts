import CreateDogProfile from '$lib/components/modals/create-dog-profile.svelte';
import Menu from '$lib/components/modals/menu.svelte';
import SignIn from '$lib/components/modals/sign-in.svelte';
import type { SvelteComponent, ComponentType } from 'svelte';
import { writable } from 'svelte/store';

type Modal = {
	title: string;
	component: ComponentType<SvelteComponent>;
	size: string;
};

type SelectedModal = {
	modal: Modal;
	props: Record<string, any>;
} | null;

const modalsRegistry = {
	menu: {
		title: 'Menu',
		component: Menu,
		size: 'md'
	},
	signin: {
		title: 'Sign In',
		component: SignIn,
		size: 'md'
	},
	'create-dog-profile': {
		title: 'Dog Profile',
		component: CreateDogProfile,
		size: 'md'
	}
};

type ModalKey = keyof typeof modalsRegistry;

export const current = writable<SelectedModal>();

export const modals = {
	show: (key: ModalKey, props: Record<string, any> = {}) => {
		current.set({
			modal: modalsRegistry[key],
			props
		});
	},

	hide: () => current.set(null)
};
