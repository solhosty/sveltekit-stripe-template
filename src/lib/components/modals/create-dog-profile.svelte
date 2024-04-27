<script lang="ts">
	import { modals } from '$lib/state/modal';
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';

	let name: string = '';
	let breed: string = '';
	let age: number;
	let weight: number;
	let special_instructions: string = '';
	let aggressive: boolean = false;

	const submit = async () => {
		const create = await trpc($page).createDogProfile.query({
			name: name,
			breed: breed,
			age: age,
			weight: weight,
			special_instructions: special_instructions,
			aggressive: aggressive
		});
		modals.hide();
		window.location.reload();
	};
</script>

<div>
	<div class="gap-4 flex flex-col">
		<form class="space-y-2">
			<div class="space-y-2 w-full flex flex-col">
				<h2 class="text-2xl font-semibold">Create Dog Profile</h2>
				<p class="text-md">Create a reusable profile for your dog!</p>
				<label class="my-2 font-bold" for="name">Name</label>
				<input
					required
					placeholder="Your Dog's Name"
					class="input input-bordered rounded-xl"
					type="text"
					bind:value={name}
				/>
				<label class="my-2 font-bold" for="breed">Breed</label>
				<input
					required
					placeholder="Your Dog's Breed"
					class="input input-bordered rounded-xl"
					type="text"
					bind:value={breed}
				/>
				<label class="my-2 font-bold" for="age">Age</label>
				<input
					required
					placeholder="Your Dog's Age"
					class="input input-bordered rounded-xl"
					type="number"
					bind:value={age}
				/>
				<label class="my-2 font-bold" for="weight">Weight (lbs)</label>
				<input
					required
					placeholder="Your Dog's Weight"
					class="input input-bordered rounded-xl"
					type="number"
					bind:value={weight}
				/>
				<label class="my-2 font-bold" for="aggressive">Aggressive/Anxious</label>
				<input type="checkbox" class="toggle" bind:checked={aggressive} />
				<label class="my-2 font-bold" for="special_instructions">Special Instructions</label>
				<textarea
					required
					placeholder="Special Instructions"
					class="textarea rounded-xl input-bordered"
					bind:value={special_instructions}
				/>
			</div>
			<button
				type="button"
				class="btn w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white border-2"
				on:click={submit}
			>
				Create</button
			>
		</form>
	</div>
</div>
