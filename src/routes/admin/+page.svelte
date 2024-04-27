<script lang="ts">
	import AppointmentCard from '$lib/components/appointment-card.svelte';
	export let data;
</script>

<div class="w-full max-w-3xl flex-col flex justify-center m-auto">
	<h1 class="flex my-2 flex-col text-center font-extrabold text-3xl">Admin</h1>
	<div role="tablist" class="tabs tabs-lifted">
		<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Pending" checked />
		<div role="tabpanel" class="tab-content space-y-4 bg-base-100 border-base-300 rounded-box p-10">
			{#if data.pending.length > 0}
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2 max-w-3xl">
					{#each data.pending as appointment}
						{#if !appointment.pending && !appointment.cancelled}
							<AppointmentCard {appointment} />
						{/if}
					{/each}
				</div>
			{:else}
				<p class="text-2xl font-bold">No pending appointments</p>
			{/if}
		</div>
		<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Active" />
		<div role="tabpanel" class="tab-content space-y-4 bg-base-100 border-base-300 rounded-box p-10">
			{#if data.incomplete.length > 0}
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2 max-w-3xl">
					{#each data.incomplete as appointment}
						{#if !appointment.completed}
							<AppointmentCard {appointment} />
						{/if}
					{/each}
				</div>
			{:else}
				<p class="text-2xl font-bold">No incomplete appointments</p>
			{/if}
		</div>

		<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Completed" />
		<div role="tabpanel" class="tab-content space-y-4 bg-base-100 border-base-300 rounded-box p-10">
			{#if data.completed.length > 0}
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2 max-w-3xl">
					{#each data.completed as appointment}
						{#if appointment.completed}
							<AppointmentCard {appointment} />
						{/if}
					{/each}
				</div>
			{:else}
				<p class="text-2xl font-bold">No appointments completed.</p>
			{/if}
		</div>
		<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Cancelled" />
		<div role="tabpanel" class="tab-content space-y-4 bg-base-100 border-base-300 rounded-box p-10">
			{#if data.cancelled.length > 0}
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2 max-w-3xl">
					{#each data.cancelled as appointment}
						{#if appointment.cancelled}
							<AppointmentCard {appointment} />
						{/if}
					{/each}
				</div>
			{:else}
				<p class="text-2xl font-bold">No appointments cancelled.</p>
			{/if}
		</div>
	</div>
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center"></div>
</div>
