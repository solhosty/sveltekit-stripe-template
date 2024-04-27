<script>
	import { Phone, Mail } from 'lucide-svelte';
	import { PUBLIC_EMAIL, PUBLIC_PHONE } from '$env/static/public';
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 my-2">
	<a href="tel:{PUBLIC_PHONE}" target="_blank">
		<div
			class="card border-2 rounded-xl my-2 text-white shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
		>
			<div class="card-body">
				<Phone color={'white'} />
				<h2 class="card-title text-white">Call/Text</h2>
				<p class="text-white">Response within business hours</p>
				<p>{PUBLIC_PHONE}</p>
				<div class="card-actions justify-end"></div>
			</div>
		</div>
	</a>
	<a href="mailto:{PUBLIC_EMAIL}" target="_blank">
		<div
			class="card border-2 text-white rounded-xl my-2 shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
		>
			<div class="card-body">
				<Mail color={'white'} />
				<h2 class="card-title text-white">Email</h2>
				<p class="text-white">Response within 48hrs</p>
				<p>{PUBLIC_EMAIL}</p>
				<div class="card-actions justify-end"></div>
			</div>
		</div>
	</a>
</div>
