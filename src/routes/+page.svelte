<script lang="ts">
	import { Contact, Instagram, Facebook, Linkedin } from 'lucide-svelte';
	import ServiceCard from '$lib/components/service-card.svelte';
	import TestimonialCard from '$lib/components/testimonial-card.svelte';
	import ContactInfo from '$lib/components/contact-info.svelte';
	import { page } from '$app/stores';
	import { modals } from '$lib/state/modal.js';
	import type { PageData } from './$types';

	export let data: PageData;

	$: testimonials = data?.testimonials;

	$: services = data?.services;

	if ($page.url.searchParams.get('error') === 'unauthorized' && !data.session.user) {
		modals.show('signin');
	}
</script>

<div class="flex m-auto max-w-3xl flex-col items-center justify-center pb-10">
	<div class="flex flex-row p-2">
		<img src="paw-logo.png" alt="" class="w-20" />
		<h1
			class="text-8xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
		>
			paws
		</h1>
	</div>
	<p class="text-lg opacity-80 font-semibold">Columbia, SC</p>
	<script
		src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
		type="module"
	></script>

	<dotlottie-player
		src="https://lottie.host/9dcb4270-2db6-419c-a12a-1716897c52ae/m92IUexJqZ.json"
		background="transparent"
		speed="1"
		style="width: 300px; height: 300px;"
		loop
		autoplay
	></dotlottie-player>
	<div class="space-y-2 text-center m-auto">
		<h3>Follow on Socials</h3>
		<div class="flex-row flex gap-3">
			<a href="https://www.instagram.com/pawssc29206" target="_blank">
				<Instagram size={40} />
			</a>
			<a href="https://facebook.com/" target="_blank">
				<Facebook size={40} />
			</a>
			<a href="https://linkedin.com/" target="_blank">
				<Linkedin size={40} />
			</a>
		</div>
	</div>
	<div class="divider"></div>
	<div class="flex flex-row gap-2 my-4">
		<h2
			class="text-4xl text-left font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
		>
			SERVICES
		</h2>
	</div>
	<div class="divider"></div>
	<div class="w-full flex gap-2 flex-col p-2">
		{#each services as service}
			<ServiceCard job={service} />
		{/each}
	</div>

	<div class="divider"></div>
	<div class="flex flex-row gap-2 my-4">
		<h2
			class="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
		>
			REVIEWS
		</h2>
	</div>
	<div class="divider"></div>
	<div class="carousel rounded-box max-w-sm lg:max-w-3xl">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-3 p-2">
			{#each testimonials as testimonal}
				<div class="carousel-item space-x-2 mx-2">
					<TestimonialCard {testimonal} />
				</div>
			{/each}
		</div>
	</div>
	<div class="divider"></div>
	<div class="flex flex-row gap-2 my-4">
		<Contact color={'#5D3FD3'} size={40} />
		<h2
			class="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
		>
			Contact
		</h2>
	</div>
	<div class="divider"></div>
	<h3 class="text-2xl font-semibold p-2 text-center">
		Having issues with scheduling or have a question?
	</h3>
	<div class="my-2">
		<ContactInfo />
	</div>
</div>
