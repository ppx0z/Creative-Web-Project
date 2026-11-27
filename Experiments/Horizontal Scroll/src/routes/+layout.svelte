
<script>
	import favicon from "#lib/assets/favicon.svg";
	import { goto, onNavigate } from "$app/navigation";
	import { page as pageStore } from "$app/state";
	import { onMount } from "svelte";
	import { gsap } from "gsap";

	let page;

	const routes = ["/", "/about", "/work"];

	let currentRouteIndex = 0;
	let isAnimating = false;
	let direction = 1;

	// Keeps track of the current route
	onMount(() => {
		currentRouteIndex = routes.indexOf(pageStore.url.pathname);

		const handleWheel = (event) => {
			if (isAnimating) return;

			const routeDirection = event.deltaY > 0 ? 1 : -1;
			const nextRouteIndex = currentRouteIndex + routeDirection;

			// Prevents it from navigating beyond the first or last route
			if (nextRouteIndex < 0 || nextRouteIndex >= routes.length) return;

			event.preventDefault();

			direction = routeDirection;
			currentRouteIndex = nextRouteIndex;
			isAnimating = true;

			goto(routes[nextRouteIndex]).catch((error) => {
				console.error("Navigation failed:", error);
				isAnimating = false;
			});
		};

		window.addEventListener("wheel", handleWheel, {
			passive: false
		});

		return () => {
			window.removeEventListener("wheel", handleWheel);
		};
	});

	// Animates between routes
	onNavigate(({ from, to }) => {
		if (!from || !to || from.url.pathname === to.url.pathname) {
			return;
		}

		// Syncs route index for links and browser history
		const fromIndex = routes.indexOf(from.url.pathname);
		const toIndex = routes.indexOf(to.url.pathname);

		if (fromIndex !== -1 && toIndex !== -1) {
			direction = toIndex > fromIndex ? 1 : -1;
			currentRouteIndex = toIndex;
		}

		// Determines which side the incoming page starts on
		const distance = window.innerWidth * direction;

		return new Promise((resolve) => {
			// Animates the outgoing page away
			gsap.to(page, {
				x: -distance,
				duration: 0.5,
				onComplete: () => {
					resolve(() => {
						// Positions the incoming page
						gsap.set(page, {
							x: distance
						});

						// Animates the incoming page into view
						gsap.to(page, {
							x: 0,
							duration: 0.5,
							onComplete: () => {
								isAnimating = false;
							}
						});
					});
				}
			});
		});
	});

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/work">Work</a>
</nav>

<div class="page" bind:this={page}>
	{@render children()}
</div>

<style>
	.page {
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
	}
</style>
