<script>
	import favicon from "#lib/assets/favicon.svg";

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

<style>
	nav {
		background-color: #294b32;
		padding: 1.5rem 2rem;
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	nav a {
		color: #f2f2f2;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
		font-family: system-ui, sans-serif;
		font-size: 17px;
	}

	nav a:hover {
		color: #c7d9bd;
	}
</style>
