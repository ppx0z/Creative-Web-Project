<script>
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
    <a href="/"> Home</a>
    <a href="/add-plant"> Add Plant</a>
    <a href="/browse-plant"> Browse Plant</a>
</nav>

<main>
	{@render children()}
</main>

