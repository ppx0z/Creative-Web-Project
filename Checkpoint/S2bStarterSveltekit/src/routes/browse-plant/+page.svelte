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

			await invalidateAll();
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
							{plant.swapped ? "Unavailable" : "Available"}
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
<style>

	a {
		text-decoration: none;
	}

	a:hover {
		color: #6B9877;
	}
	.plant-shelf {
		display: grid;
		list-style: none;
		grid-template-columns: repeat(auto-fit, minmax(15.6rem, 1fr));
		gap: 1.25rem;
		max-width: 56rem;
		margin: 1.8rem auto;
	}

	.plant-card {
		 background: #ffffff;
    padding: 1.375rem;
    border-radius: 0.875rem;
    border: 1.5px solid #dce6d8;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
    transition: transform 0.2s, box-shadow 0.2s;
	}

	.plant-card:hover {
	transform: translateY(-0.25rem);
    box-shadow: 0 7px 18px rgba(0, 0, 0, 0.09)
	}

	.plant-card h3 {
    color: #294b32;
    font-size: 1.25rem;
    margin: 0 0 0.75rem;
	font-family: system-ui, sans-serif;
	}

	.plant-card h3:hover {
		  color: #6B9877;
	}

.plant-card p {
    color: #657565;
    font-size: 0.875rem;
    margin: 0.5rem 0;
	font-family: system-ui, sans-serif;

}


.plant-card button {
    background: #f7eeee;
    color: #a34e4e;
    border: none;
    border-radius: 0.4375rem;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
}

.plant-card button:hover {
    background: #f0dada;
}

.filter {
    text-align: center;
    margin: 1.5625rem 0;
}

.filter a {
    color: #47764b;
    text-decoration: none;
    margin: 0 0.625rem;
    font-weight: 600;
    font-family: system-ui, sans-serif;
}

.filter a:hover {
    text-decoration: none;
}

</style>