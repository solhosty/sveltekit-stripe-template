<script lang="ts">
	import { page } from '$app/stores';
	import { interaction } from '$lib/state/admin';
	import { trpc } from '$lib/trpc/client';
	import { onMount } from 'svelte';

	export let appointment: any;
	let dog: any;
	async function getDog() {
		const dog = await trpc($page).getDogProfileById.query({
			id: appointment.dogId
		});
		return dog;
	}

	onMount(async () => {
		dog = await getDog();
	});

	async function approveAppintment(appointment: string) {
		if ($page.data.session?.user) {
			const app = await trpc($page).approveAppointment.query({
				id: appointment
			});
			interaction.set(true);
			if (!app) {
				return;
			}
			interaction.set(false);
		}
	}
	async function deleteAppointment(appointment: string) {
		if ($page.data.session?.user) {
			const app = await trpc($page).deleteAppointment.query({
				id: appointment
			});
			if (!app) {
				return;
			}
		}
	}
	async function denyAppointment(appointment: string) {
		if ($page.data.session?.user) {
			const app = await trpc($page).denyAppointment.query({
				id: appointment
			});
			if (!app) {
				return;
			}
		}
	}
	async function completeAppointment(appointment: string) {
		if ($page.data.session?.user) {
			const app = await trpc($page).completeAppointment.query({
				id: appointment
			});
			if (!app) {
				return;
			}
		}
	}
</script>

<div class="card border-2 rounded-xl shadow-xl">
	<div class="card-body">
		<div class="flex flex-row gap-2">
			<h2
				class="card-title text-base font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
			>
				{appointment.name}
			</h2>
			<p class="opacity-80 my-2 font-extrabold">- {appointment.type.toUpperCase()}</p>
		</div>
		<div class="flex flex-row gap-2">
			<p class="text-green-600">${appointment?.deposit}</p>
		</div>
		<p class="text-xs">{appointment.date}</p>
		<div
			class="tooltip"
			data-tip="Name: {dog?.name} Age: {dog?.age} Weight: {dog?.weight} Breed: {dog?.breed} Aggressive: {dog?.aggressive} Special Instructions: {dog?.special_instructions}"
		>
			<div
				class="badge badge-secondary border-none rounded-xl p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
			>
				Dog - {dog?.name}
			</div>
		</div>
		{#if appointment.location}
			<p class="text-base font-semibold">{appointment?.location}</p>
		{/if}
		<div class="card-actions w-full my-2">
			{#if !appointment.pending && !appointment.cancelled && !appointment.completed}
				<button
					on:click={() => approveAppintment(appointment.id)}
					class="btn w-full font-bold rounded-xl"
					><h2
						class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl"
					>
						Approve
					</h2></button
				>
				<button
					on:click={() => denyAppointment(appointment.id)}
					class="btn w-full font-bold rounded-xl"
					><h2
						class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl"
					>
						Deny
					</h2></button
				>
			{:else if appointment.completed}
				<button disabled class="btn w-full font-bold rounded-xl"
					><h2
						class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl"
					>
						Completed
					</h2></button
				>
			{:else if !appointment.completed && appointment.pending}
				<button
					on:click={() => completeAppointment(appointment.id)}
					class="btn w-full font-bold rounded-xl"
					><h2
						class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl"
					>
						Complete
					</h2></button
				>
				<button
					on:click={() => denyAppointment(appointment.id)}
					class="btn w-full font-bold rounded-xl"
					><h2
						class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl"
					>
						Cancel
					</h2></button
				>
			{:else if appointment.cancelled}
				<button
					on:click={() => approveAppintment(appointment.id)}
					class="btn w-full font-bold rounded-xl"
					><h2
						class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl"
					>
						Approve
					</h2></button
				>
				<button
					on:click={() => deleteAppointment(appointment.id)}
					class="btn w-full font-bold rounded-xl"
					><h2
						class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-2xl"
					>
						Delete
					</h2></button
				>
			{/if}
		</div>
	</div>
</div>
