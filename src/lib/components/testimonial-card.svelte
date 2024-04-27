<script lang="ts">
	import { PawPrint } from 'lucide-svelte';

	export let testimonal: any;
</script>

<div class="card border-2 rounded-xl shadow-md max-w-sm lg:max-w-2xl">
	<div class="card-body">
		<div class="flex flex-row gap-2">
			<PawPrint size={25} />
			<h2
				class="card-title font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
			>
				{testimonal.name}
			</h2>
		</div>
		<p class="text-base">{testimonal.review}</p>
		<div class="card-actions w-full my-2">
			<div class="rating gap-1">
				{#each Array(testimonal.rating) as _}
					<input
						type="radio"
						name="rating-3"
						class="mask mask-heart bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
						disabled
					/>
				{/each}
			</div>
		</div>
	</div>
</div>
