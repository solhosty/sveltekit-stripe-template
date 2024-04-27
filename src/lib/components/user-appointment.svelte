<script lang="ts">
	import { page } from '$app/stores';
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
	$: if (appointment.date.endsWith('to undefined at undefined')) {
		appointment.date = appointment.date.replace('to undefined at undefined', '');
	}

	onMount(async () => {
		dog = await getDog();
	});
</script>

<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-xl">
	<div class="card h-full border-2 bg-white rounded-xl shadow-lg">
		<div class="card-body space-y-2">
			<div class="flex flex-row gap-1 flex-wrap">
				<p class="italic text-xl font-extrabold">{appointment.type.toUpperCase()}</p>
			</div>
			<div
				class="badge badge-secondary border-none rounded-xl p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
			>
				<p>Paid: ${appointment.deposit}</p>
			</div>
			<p class="italic text-xs opacity-90 font-semibold">{appointment.date}</p>
			<div
				class="tooltip justify-start flex"
				data-tip="Name: {dog?.name} Age: {dog?.age} Weight: {dog?.weight} Breed: {dog?.breed} Aggressive: {dog?.aggressive} Special Instructions: {dog?.special_instructions}"
			>
				<div
					class="badge badge-secondary border-none rounded-xl p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
				>
					Dog - {dog?.name}
				</div>
			</div>
			<div class="card-actions w-full my-2"></div>
		</div>
	</div>
</div>
