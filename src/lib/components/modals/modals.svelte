<script lang="ts">
	import { onMount } from 'svelte';
	import { XSquare } from 'lucide-svelte';
	import { current } from '$lib/state/modal';

	let dialogElement: HTMLDialogElement | undefined;

	onMount(() => {
		if (dialogElement && $current) {
			dialogElement.showModal();
		}
	});

	$: if (dialogElement) {
		if ($current) {
			dialogElement.showModal();
		} else {
			dialogElement.close();
		}
	}
</script>

<dialog
	bind:this={dialogElement}
	class="modal"
	class:modal-lg={$current && $current.modal.size === 'lg'}
>
	{#if $current}
		<div class="modal-box p-6 relative flex flex-col border-2 rounded-xl">
			<nav class="relative flex justify-center">
				<button class="absolute right-0 top-0 text-2xl" on:click={() => current.set(null)}>
				</button>
			</nav>
			<div>
				<svelte:component this={$current.modal.component} {...$current.props} />
			</div>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	{/if}
</dialog>
