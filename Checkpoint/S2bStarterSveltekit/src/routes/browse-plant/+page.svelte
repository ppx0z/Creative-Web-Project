<script>
    import { invalidateAll } from '$app/navigation';

	let listError = $state("");

	let { data } = $props();

	// Our own copy of the list, seeded from load()'s data, so the page can
	let  plants = $state(data.plants ?? []);


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

<nav>
	
</nav>
<main>
	<ul class="plant-shelf">
		{#each plants as plant (plant.id)}
			<li class="sketch-card" style="border-left-color:">
				<div>
					<strong>{plant.name}</strong>
					<span class="species"> Species {plant.species}</span>
					<span class="swapped"> Swapped? {plant.swapped}</span>
					<span class="light-needed">
						Light Requirements {plant.lightNeeded}</span
					>
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
