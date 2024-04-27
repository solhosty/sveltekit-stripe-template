<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { modals } from '$lib/state/modal';

	export let job: any;

	const navigateToBooking = (jobPackageSlug: string) => {
		if (!$page.data.session?.user?.id) {
			modals.show('signin');
		} else {
			goto(`/book/${jobPackageSlug}`);
		}
	};
</script>

<details
	class="collapse collapse-arrow border-collapse border-2 w-full rounded-2xl p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
>
	<summary class="collapse-title text-white space-y-2">
		<div class="flex flex-row gap-4">
			<img src={job.image} alt={job.name} class="h-10 w-10" />
			<h2 class="text-4xl font-bold text-white">{job.name}</h2>
		</div>
		<p class="text-base text-white">{job.description}</p>
	</summary>
	<div class="collapse-content space-y-4">
		<div class="card-actions w-full my-2">
			{#if job.packages}
				<div
					class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 sm:grid-cols-1 gap-4 max-h-[30rem] overflow-scroll"
				>
					{#each job.packages as jobPackage}
						<div class="card bg-base-100 shadow-xl rounded-xl">
							<div class="card-body">
								<h2
									class="card-title font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
								>
									{jobPackage.name.toUpperCase()}
								</h2>
								<div
									class="badge border-none bg-gradient-to-r badge-secondary from-indigo-500 via-purple-500 to-pink-500 rounded-xl"
								>
									Base Price: ${jobPackage?.cost}
								</div>
								<p>{jobPackage.description}</p>
								<strong>Includes:</strong>
								<div>
									{@html jobPackage.includes.html
										.replace(/<div>/g, '<li> - ')
										.replace(/<\/div>/g, '</li>')}
								</div>
								<!-- <ul>
									{#each jobPackage.includes as include}
										<li>- {include}</li>
									{/each}
								</ul> -->
								<div class="card-actions justify-end">
									<button
										on:click={() => navigateToBooking(jobPackage.slug)}
										class="btn text-white rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
										>Book</button
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</details>
