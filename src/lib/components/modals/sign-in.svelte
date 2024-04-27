<script lang="ts">
	import { goto } from '$app/navigation';
	import { modals } from '$lib/state/modal';
	import { signIn } from '@auth/sveltekit/client';
</script>

<div>
	<div class="gap-4 flex flex-col">
		<div class="space-y-2">
			<h2 class="text-2xl font-semibold">Remember to sign in...</h2>
			<p class="text-md">Sign in or sign up with Google to book an appointment!</p>
		</div>
		<button
			class="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white border-2"
			on:click={() => signIn('google')}
		>
			Login</button
		>
	</div>
</div>
