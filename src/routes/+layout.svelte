<script>
	import Modals from '$lib/components/modals/modals.svelte';
	import Nav from '$lib/components/nav.svelte';
	import '../app.postcss';
</script>

<svelte:head>
	<title>paws</title>
</svelte:head>

<Nav />
<slot />
<Modals />
