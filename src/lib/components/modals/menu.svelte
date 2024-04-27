<script lang="ts">
	import { goto } from '$app/navigation';
	import { modals } from '$lib/state/modal';

	const hideModal = (route: string) => {
		modals.hide();
		goto(route);
	};
</script>

<div>
	<div class="gap-2 flex flex-col">
		<button
			on:click={() => hideModal('/user')}
			class="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full border-2 rounded-xl"
		>
			<h3 class="text-white text-2xl">My Appointments</h3>
		</button>
		<button
			on:click={() => hideModal('/')}
			class="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full border-2 rounded-xl"
		>
			<h3 class="text-white text-2xl">Home</h3>
		</button>
	</div>
</div>
