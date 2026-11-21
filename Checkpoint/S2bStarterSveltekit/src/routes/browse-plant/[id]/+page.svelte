<script>
  let { data } = $props();
</script>
<main>
{#if data.plant}
  <h1>{data.plant.name}</h1>

  <p>Species: {data.plant.species}</p>
  <p>Swapped: {data.plant.swapped ? "Yes" : "No"}</p>
  <p>Light needs: {data.plant.lightNeeds}</p>

  <a href="/browse-plant">Back to Browse Plants</a>
{:else}
  <h1>Not Found</h1>
  <p>Sorry, this plant could not be found.</p>
  <a href="/browse-plant">Back to Browse Plants</a>
{/if}
</main>