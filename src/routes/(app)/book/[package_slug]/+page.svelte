<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { onMount } from 'svelte';
	import type { LayoutServerData } from './$types';
	import { modals } from '$lib/state/modal';
	import Payments from '$lib/components/payments.svelte';

	export let data: LayoutServerData;
	let dogProfiles: any[] = [];
	let selectedDogs: any;
	let amount = 1;
	let phone: string = '';
	const getDogProfiles = async () => {
		const profiles = await trpc($page).getDogProfiles.query();
		return profiles;
	};
	$: step = 1;

	$: totalCost =
		selectedPackage?.cost + (amount > 1 ? (amount - 1) * selectedPackage?.discount : 0);
	$: totalWithTax = totalCost * 0.06 + totalCost;
	$: if (selectedDogs?.aggressive) {
		totalCost += selectedPackage?.aggressiveFee || 25;
	}
	$: if (!selectedDogs?.aggressive) {
		totalCost = selectedPackage?.cost;
	}
	onMount(async () => {
		dogProfiles = await getDogProfiles();
	});
	$: selectedPackage = data.selectedPackage;
	$: similarPackages = data.similarPackages;
	$: serviceName = data.service?.name;

	let location: any;
	let date: any;
	let endDate: any;
	let time: any;
	let pickUpTime: any;
	let dropOffTime: any;
	let submitted: boolean = false;

	$: if (!submitted) {
		step = 1;
	}

	const submitForm = () => {
		submitted = false;
		if (!date || !selectedDogs) {
			submitted = false;
			step = 1;
			return;
		}
		step = 2;
		submitted = true;
	};
</script>

<div class="max-w-2xl m-auto pt-10 space-y-8 p-5">
	<div class="space-y-4">
		<img class="h-16 w-16 rounded-full" src={data.session.user.image} alt="" />
		<h1 class="text-2xl font-bold">Booking for {data.session.user.name}</h1>
		<div class="space-y-2">
			<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-xl">
				<div class="card bg-white shadow-xl rounded-xl">
					<div class="card-body">
						<h2 class="card-title font-bold">Selected Package:</h2>
						<h2 class="text-lg font-semibold">
							{data.selectedPackage?.name}
							<div
								class="tooltip p-2"
								data-tip="Price can change based on selections made in the details process. Discounts are available for additional dogs for services such as walking."
							>
								<div
									class="badge border-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 badge-secondary rounded-xl"
								>
									Base Price: ${selectedPackage?.cost}
								</div>
							</div>
						</h2>
						<p>{data.selectedPackage?.description}</p>
						{#if data.selectedPackage?.includes}
							<strong>Includes:</strong>
							<div>
								{@html data.selectedPackage?.includes.html
									.replace(/<div>/g, '<li> - ')
									.replace(/<\/div>/g, '</li>')}
							</div>
						{/if}
						<div class="card-actions justify-end">
							{#if serviceName === 'Boarding' || serviceName === 'Drop-In/Walking'}
								<div class="space-x-4">
									<strong> Qty.</strong>
									<button class="" on:click={() => (amount = Math.max(1, amount - 1))}>-</button>
									{amount}
									<button class="" on:click={() => amount++}>+</button>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			class="badge flex flex-row border-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 badge-secondary rounded-xl"
		>
			Total Cost w/ Tax: ${totalWithTax}
		</div>
		<div>
			{#if selectedDogs?.aggressive}
				<div class="badge rounded-xl p-3 flex-row flex bg-warning text-white gap-2">
					Agressive/Anxious Dog Fee
				</div>
			{/if}
		</div>
		{#if step === 1}
			<div class="space-y-4">
				<h2 class="text-2xl mt-5 font-bold">Details</h2>
				<div>
					<form class="space-y-2">
						<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-xl">
							<div class="card bg-base-100 shadow-xl rounded-xl">
								<div class="card-body p-4">
									<h2 class="card-title">Fill out a few more details about your appointment!</h2>
									<p>So we can know more about the appointment</p>
									<label for="name" class="label mb-0 font-medium"> Name </label>
									<input
										id="name"
										type="text"
										class="input w-full -mt-2 input-bordered"
										placeholder="Name"
										value={data.session.user.name}
									/>
									<label for="phone" class="label mb-0 font-medium"> Phone </label>
									<input
										id="phone"
										type="tel"
										class="input w-full -mt-2 input-bordered"
										placeholder="860-555-5555"
										bind:value={phone}
									/>
									<label for="name" class="label mb-0 font-medium"> Select Dog Profile </label>
									{#if dogProfiles.length > 0}
										<select id="dog" class="select select-bordered" bind:value={selectedDogs}>
											{#each dogProfiles as dog}
												<option value={dog}>{dog.name}</option>
											{/each}
										</select>
										<button
											class="btn w-full border-1 border-gray-400 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
											on:click={() => modals.show('create-dog-profile')}
										>
											Create new profile
										</button>
									{:else}
										<p>You have no dog profiles</p>
										<button
											class="btn w-full border-1 border-gray-400 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
											on:click={() => modals.show('create-dog-profile')}
										>
											Create dog profile
										</button>
									{/if}
									{#if serviceName === 'Drop-In/Walking'}
										<label for="date" class="label mb-0 font-medium"> Date </label>
										<input
											id="date"
											bind:value={date}
											type="date"
											class="input w-full -mt-2 input-bordered"
										/>
										<label for="time" class="label mb-0 font-medium"> Time </label>
										<input
											required
											id="time"
											bind:value={time}
											type="time"
											class="input w-full -mt-2 input-bordered"
										/>
										<label for="location" class="label mb-0 font-medium"> Location </label>
										<input
											required
											id="location"
											bind:value={location}
											type="text"
											autocomplete="address-line1"
											class="input w-full -mt-2 input-bordered"
											placeholder="123 Main St. Columbia, SC 29206"
										/>
									{:else if serviceName === 'Boarding'}
										<label for="date" class="label mb-0 font-medium"> Drop Off Date </label>
										<input
											id="date"
											bind:value={date}
											type="date"
											class="input w-full -mt-2 input-bordered"
										/>
										<label for="time" class="label mb-0 font-medium"> Drop Off Time </label>
										<input
											id="dropOffTime"
											bind:value={dropOffTime}
											type="time"
											class="input w-full -mt-2 input-bordered"
										/>
										<label for="time" class="label mb-0 font-medium"> Pick Up Date </label>
										<input
											id="endDate"
											bind:value={endDate}
											type="date"
											class="input w-full -mt-2 input-bordered"
										/>
										<label for="time" class="label mb-0 font-medium"> Pick Up Time </label>
										<input
											id="pickUpTime"
											bind:value={pickUpTime}
											type="time"
											class="input w-full -mt-2 input-bordered"
										/>
									{:else if serviceName === 'DayCare'}
										<label for="date" class="label mb-0 font-medium"> Drop Off Date </label>
										<input
											id="date"
											bind:value={date}
											type="date"
											class="input w-full -mt-2 input-bordered"
										/>
										<label for="dropOffTime" class="label mb-0 font-medium"> Drop Off Time </label>
										<input
											id="dropOffTime"
											bind:value={dropOffTime}
											type="time"
											class="input w-full -mt-2 input-bordered"
										/>
										<label for="pickupDate" class="label mb-0 font-medium"> Pick Up Date </label>
										<input
											id="endDate"
											bind:value={endDate}
											type="date"
											class="input w-full -mt-2 input-bordered"
										/>
										<label for="pickUpTime" class="label mb-0 font-medium"> Pick Up Time </label>
										<input
											id="pickUpTime"
											bind:value={pickUpTime}
											type="time"
											class="input w-full -mt-2 input-bordered"
										/>
									{:else if serviceName === 'Training'}
										<label for="date" class="label mb-0 font-medium"> Drop Off Date </label>
										<input
											id="date"
											bind:value={date}
											type="date"
											class="input w-full -mt-2 input-bordered"
										/>
										<label for="dropOffTime" class="label mb-0 font-medium"> Drop Off Time </label>
										<input
											id="dropOffTime"
											bind:value={dropOffTime}
											type="time"
											class="input w-full -mt-2 input-bordered"
										/>
										<label for="pickupDate" class="label mb-0 font-medium"> Pick Up Date </label>
										<input
											id="endDate"
											bind:value={endDate}
											type="date"
											class="input w-full -mt-2 input-bordered"
										/>
										<label for="pickUpTime" class="label mb-0 font-medium"> Pick Up Time </label>
										<input
											id="pickUpTime"
											bind:value={pickUpTime}
											type="time"
											class="input w-full -mt-2 input-bordered"
										/>
									{/if}
									<!-- {#if data.service && selectedPackage}
                      <BoardCalendar service={data.service} selectedPackage={selectedPackage} quantity={amount}/>
                      {/if} -->
									<div class="card-actions justify-end mt-5 rounded-xl">
										<button
											class="btn border-1 border-gray-400 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
											on:click={submitForm}
										>
											Continue to payment
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		{:else if step === 2}
			<div class="mt-10"></div>
			<Payments
				config={{
					appointment: {
						name: data.session.user.name || '',
						type: selectedPackage?.name || '',
						location: location || '',
						dogId: selectedDogs.id,
						dateSelected: `${date} at ${dropOffTime || time} to ${endDate} at ${dropOffTime}`,
						duration: selectedPackage?.duration || 0,
						cost: totalWithTax,
						phone: phone
					}
				}}
			/>
		{/if}
		<div>
			<div class="">
				<h2 class="text-2xl font-semibold mt-20 mb-3">See similar packages...</h2>
				<div class="carousel max-w-full carousel-center overflow-x-scroll rounded-box gap-2 p-2">
					{#each similarPackages ?? [] as similar}
						<div class="carousel-item max-w-xs lg:max-w-lg">
							<div
								class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-xl"
							>
								<div class="card h-full rounded-xl bg-base-100 shadow-xl space-y-2">
									<div class="card-body">
										<h2 class="card-title">{similar.name}</h2>
										<div
											class="badge justify-start bg-gradient-to-r border-none from-indigo-500 via-purple-500 to-pink-500 badge-secondary rounded-xl"
										>
											Base Price: ${similar?.cost}
										</div>
										<p>{similar.description}</p>
										<div class="card-actions justify-end">
											<button
												on:click={() => goto(`/book/${similar.slug}`)}
												class="btn border-1 border-gray-400 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
												>Choose instead</button
											>
										</div>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
