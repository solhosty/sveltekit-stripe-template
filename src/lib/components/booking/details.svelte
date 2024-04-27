<script lang="ts">
	export let config = {
		appointment: {
			name: '' as string,
			description: '' as string,
			location: '' as string,
			dogs: 1 as number,
			duration: 15 as number,
			dateSelected: '' as string,
			timeSelected: '' as string
		}
	};
</script>

<div class="flex flex-col gap-2 w-full p-2">
	<div class="flex flex-col gap-2">
		<h3 class="text-xl font-semibold">Name</h3>
		<p>{config.appointment.name}</p>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="text-xl font-semibold">Date</h3>
		<p>{config.appointment.dateSelected} at {config.appointment.timeSelected}</p>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="text-xl font-semibold">Description</h3>
		<p>{config.appointment.description}</p>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="text-xl font-semibold">Location</h3>
		<p>{config.appointment.location}</p>
	</div>
	<div class="flex-row flex gap-8">
		<div class="flex flex-col gap-2">
			<h3 class="text-xl font-semibold">Dogs</h3>
			<p>{config.appointment.dogs}</p>
		</div>
		<div class="flex flex-col gap-2">
			<h3 class="text-xl font-semibold">Duration</h3>
			<p>{config.appointment.duration}</p>
		</div>
		<div class="flex flex-col gap-2">
			<h3 class="text-xl font-semibold">Cost</h3>
			<p>${((20 * config.appointment.duration) / 15) * config.appointment.dogs}</p>
		</div>
	</div>
</div>
