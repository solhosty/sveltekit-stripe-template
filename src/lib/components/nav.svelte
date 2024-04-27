<script>
	import { modals } from '$lib/state/modal';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { LogOut } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<nav class="flex justify-between items-center p-2 w-full border-b-2">
	<a class="flex items-center mx-2" href="/">
		<img src="/paw-logo.png" alt="" class="h-10 w-10" />
		<h1
			class="font-extrabold text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
		>
			paws
		</h1>
	</a>

	<div class="flex items-center">
		{#if $page.data.session?.user?.name}
			<a href="/user" class="flex items-center mx-2">
				<img class="h-8 w-8 rounded-full" src={$page.data.session?.user?.image} alt="avatar" />
			</a>
			<button
				class="btn ml-2 rounded-xl bg-gradient-to-r text-white from-indigo-500 via-purple-500 to-pink-500"
				on:click={() => signOut()}><LogOut size={20} color={'white'} /></button
			>
		{:else}
			<button
				class="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white border-2"
				on:click={() => signIn('google')}
			>
				Login</button
			>
		{/if}
		<button
			class="btn mx-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center"
			on:click={() => modals.show('menu')}
		>
			<img src="/menu.svg" alt="" class="h-6 w-6" />
		</button>
	</div>
</nav>
