<script>
	import favicon from "#lib/assets/favicon.svg";
	import { onNavigate } from "$app/navigation";
	//import { onMount } from "svelte";
	import { gsap } from "gsap";

	onNavigate(() => {
		//Animates the current page out
		return new Promise((resolve) => {
			gsap.to(".page", {
				x: window.innerWidth,
				duration: 0.5,
				onComplete: () => {
					//Tells SvelteKit that the animation is complete.
					resolve(() => {
						//Positions the incoming page
						gsap.set(".page", { 
						x: window.innerWidth 
					});

						//animates the incoming page in
						gsap.to(".page", {
							x: 0,
							duration: 0.5,
						});
					});
				},
			});
		});
	});

	/** @type {{children: import('svelte').Snippet}} */
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

<div class="page">
	{@render children()}
</div>
