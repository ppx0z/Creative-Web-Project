<script>
	import { invalidateAll } from "$app/navigation";

	let listError = $state("");

	let { data } = $props();

	// keeps the plant list updated with the latest data returned by load()
	let plants = $derived(data.plants ?? []);

	// DELETE — the ✕ button. A successful delete answers 204 (No Content),
	async function deletePlant(plant) {
		listError = "";

		try {
			const res = await fetch(`/api/plants/${plant.id}`, {
				method: "DELETE",
			});

			if (!res.ok) {
				throw new Error(`Request failed with status ${res.status}`);
			}

			plants = plants.filter((p) => p.id !== plant.id);
		} catch (err) {
			listError = "Could not delete that plant. Is the API running?";
			console.error(err);
		}
	}
</script>

<main>
	<section class="filter">
		<a href="/browse-plant">All</a>
		<a href="/browse-plant?light=low">Low</a>
		<a href="/browse-plant?light=medium">Medium</a>
		<a href="/browse-plant?light=bright">Bright</a>
	</section>

	<ul class="plant-shelf">
		{#each plants as plant (plant.id)}
			<li class="plant-card">
				<div>
					<a href={`/browse-plant/${plant.id}`}>
						<h3>{plant.name}</h3>
					</a>
					<p>
						Availability: 
						<span> 
							{plant.swapped ? "Unavailable" : "Avaialble"}
						</span>
					</p>
				</div>
				<div class="buttons">
					<button
						class="icon-button delete"
						onclick={() => deletePlant(plant)}
					>
						✕
					</button>
				</div>
			</li>
		{/each}
	</ul>
</main>
