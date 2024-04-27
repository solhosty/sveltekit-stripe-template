<script lang="ts">
	import { loadStripe, type Stripe } from '@stripe/stripe-js';
	import { Elements, PaymentElement } from 'svelte-stripe';
	import { onMount } from 'svelte';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { goto } from '$app/navigation';

	let clientSecret: any;
	let elements: any;
	let stripe: Stripe;
	let loading = false;

	export let config = {
		appointment: {
			name: '' as string,
			type: '' as string,
			location: '' as string,
			dogId: '' as string,
			duration: 15 as number,
			dateSelected: '' as string,
			cost: 0 as number,
			phone: '' as string
		}
	};

	onMount(async () => {
		clientSecret = await createPaymentIntent();
		//@ts-ignore
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
	});

	async function createPaymentIntent() {
		const response = await fetch('/stripe/payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				amount: config.appointment.cost * 100,
				name: config.appointment.name,
				discount: 5,
				packageName: config.appointment.type || 'MISC'
			})
		});
		const { clientSecret } = await response.json();

		return clientSecret;
	}
	async function confirmAppointment() {
		if ($page.data?.session?.user) {
			await trpc($page).createAppointment.query({
				name: config.appointment.name,
				type: config.appointment.type || 'MISC',
				location: config.appointment.location,
				dogId: config.appointment.dogId,
				date: config.appointment.dateSelected,
				deposit: config.appointment.cost,
				phone: config.appointment.phone.toString()
			});
			loading = false;
			await goto('/user?payment=success');
		}
	}

	const submit = async () => {
		loading = true;
		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		});
		if (result.error) {
			console.error(result.error.message);
		} else {
			confirmAppointment();
		}
	};
</script>

{#if stripe}
	{#if clientSecret}
		<form on:submit|preventDefault={submit}>
			<Elements {stripe} {clientSecret} bind:elements>
				<PaymentElement />
			</Elements>
			<button
				class="btn w-full mt-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
			>
				{#if loading}
					<span class="loading loading-spinner loading-lg items-center m-auto"></span>
				{:else if !loading}
					Pay
				{/if}
			</button>
		</form>
	{/if}
{/if}
