<script>
    // `data` holds what load() in +page.server.js returned.
    let { data } = $props();

    // $state makes these reactive: the page updates when they change.
    let name = $state("");
    let species = $state("");
    let swapped = $state(false);
    let needsLight = $state("");
    let submitting = $state(false);
    let submitError = $state("");
    let listError = $state("");

   let plants = $state([data.plants]);

    // ADD — the form.
    // SvelteKit forwards it to Express.
    async function handleSubmit(event) {
        event.preventDefault(); // stop the browser reloading the page
        submitting = true;
        submitError = "";

        try {
            // await means: pause here until the server answers, then carry on.
            const res = await fetch("/api/plants", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, species, swapped, needsLight }),
            });

            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }

            // The API sends back the saved plant (with its id). Add it to our list.
            const newPlant = await res.json();
            plants.push(newPlant);

            name = "";
            species = "";
            swapped = false;
            needsLight = "";
        } catch (err) {
            submitError = "Could not add that plant. Is the API running?";
            console.error(err);
        } finally {
            submitting = false;
        }
    }
</script>

<nav>
    <a href="/"> Home</a>
    <a href="/add-plant"> Add Plant</a>
    <a href="/browse-plant"> Browse Plant</a>
</nav>
<main>
    <h2>Add a sketch</h2>
    <form onsubmit={handleSubmit}>
        <label>
            Name
            <input type="text" bind:value={name} required />
        </label>
        <label>
            Species
            <input type="text" bind:value={species} required />
        </label>
        <label>
            Swapped
            <input type="checkbox" bind:checked={swapped} />
        </label>

        <label for="needsLight"
            >Light Requirements

            <select id="needsLight" bind:value={needsLight} required>
                <option value="" disabled> Select light requirements</option>
                <option value="low"> Low Light</option>
                <option value="medium"> Medium Light</option>
                <option value="bright"> Bright Light</option>
            </select>
        </label>

        <button type="submit" disabled={submitting}>
            {submitting ? "Adding…" : "Add Plant"}
        </button>
        {#if submitError}
            <p class="error">{submitError}</p>
        {/if}
    </form>
</main>

<style>
    main {
        max-width: 36rem;
        margin: 2rem auto;
        padding: 0 1.5rem;
        font-family: system-ui, sans-serif;
    }
</style>
