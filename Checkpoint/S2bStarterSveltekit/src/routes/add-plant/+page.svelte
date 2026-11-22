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

<main>
    <h2>Add a plant</h2>
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

    form {
        background: #f8f9fa;
        width: 100%;
        max-width: 28rem;
        box-sizing: border-box;
        margin: 1.8rem auto;
        padding: 1.8rem;
        border-radius: 16px;
        box-shadow: 0 0.25rem 0.9rem rgba(0, 0, 0, 0.06);
    }

    h2 {
        color: #294b32;
        margin-top: 0;
        text-align: center;
    }

    label {
        display: block;
        font-weight: 600;
        margin: 0.9rem 0 0.4rem;
    }

    input:not([type="checkbox"]),
    select {
        width: 100%;
        box-sizing: border-box;
        padding: 0.75rem;
        border: 1px solid #d8e2d5;
        border-radius: 0.5rem;
        background: #fafcf9;
        font-size: 0.8rem;
    }

    input:focus,
    select:focus {
        outline: 2px solid #8aaa83;
        border-color: #47764b;
    }

    input[type="checkbox"] {
        accent-color: #47764b;
    }

    button {
        width: 100%;
        padding: 0.8125rem;
        margin-top: 1.25rem;
        background: #47764b;
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 0.9375rem;
        font-weight: bold;
        cursor: pointer;
    }

    button:hover {
        background: #345c39;
    }
</style>
