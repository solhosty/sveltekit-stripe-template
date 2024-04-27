<script lang="ts">
	import { page } from '$app/stores';
	import UserAppointment from '$lib/components/user-appointment.svelte';

	$: completedAppointments = $page.data?.appointments.filter(
		(appointment: { completed: any }) => appointment?.completed
	);
	$: pendingAppointments = $page.data?.appointments.filter(
		(appointment: { pending: any; cancelled: any; completed: any }) =>
			!appointment.pending && !appointment.cancelled && !appointment.completed
	);
	$: cancelledAppointments = $page.data?.appointments.filter(
		(appointment: { cancelled: any }) => appointment?.cancelled
	);
	$: activeAppointments = $page.data?.appointments.filter(
		(appointment: { completed: any; pending: any }) =>
			!appointment?.completed && appointment.pending
	);
</script>

<div class="p-4 m-auto max-w-3xl">
	<div class="my-6">
		<h2 class="text-3xl font-bold text-black">my appointments</h2>
	</div>
	<div role="tablist" class="tabs tabs-lifted max-w-3xl p-2">
		<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Active" checked />
		<div role="tabpanel" class="tab-content space-y-4 bg-base-100 border-base-300 rounded-box p-10">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{#if activeAppointments.length === 0}
					<p class="text-center">No active appointments</p>
				{:else}
					{#each activeAppointments as appointment}
						{#if !appointment.completed && appointment.pending}
							<UserAppointment {appointment} />
						{/if}
					{/each}
				{/if}
			</div>
		</div>

		<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Pending" />
		<div role="tabpanel" class="tab-content space-y-4 bg-base-100 border-base-300 rounded-box p-10">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{#if pendingAppointments.length === 0}
					<p class="text-center">No pending appointments</p>
				{:else}
					{#each pendingAppointments as appointment}
						{#if !appointment.pending && !appointment.cancelled && !appointment.completed}
							<UserAppointment {appointment} />
						{/if}
					{/each}
				{/if}
			</div>
		</div>
		<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Completed" />
		<div role="tabpanel" class="tab-content space-y-4 bg-base-100 border-base-300 rounded-box p-10">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{#if completedAppointments.length === 0}
					<p class="text-center">No completed appointments</p>
				{:else}
					{#each completedAppointments as appointment}
						{#if appointment.completed}
							<UserAppointment {appointment} />
						{/if}
					{/each}
				{/if}
			</div>
		</div>
		<input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Cancelled" />
		<div role="tabpanel" class="tab-content space-y-4 bg-base-100 border-base-300 rounded-box p-10">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{#if cancelledAppointments.length === 0}
					<p class="text-center">No cancelled appointments</p>
				{:else}
					{#each cancelledAppointments as appointment}
						{#if appointment.cancelled}
							<UserAppointment {appointment} />
						{/if}
					{/each}
				{/if}
			</div>
		</div>
	</div>
	<!-- <div class="flex flex-row m-auto justify-center gap-4 my-4 p-2">
		<button on:click={() => goto('/book?Walking')} class="btn p-2 rounded-xl bg-gradient-to-r text-white from-indigo-500 via-purple-500 to-pink-500">
			<img src="/walking.svg" alt="" class="h-8 w-8" />
			<p
				class="font-bold text-lg text-white"
			>
				Book Walking
			</p>
		</button>
		<button on:click={() => goto('/book?Boarding')} class="btn p-2 rounded-xl bg-gradient-to-r text-white from-indigo-500 via-purple-500 to-pink-500">
			<img src="/boarding.svg" alt="" class="h-8 w-8" />
			<p
				class="font-bold text-lg text-white"
			>
				Book Boarding
			</p>
		</button>
	</div> -->
</div>
