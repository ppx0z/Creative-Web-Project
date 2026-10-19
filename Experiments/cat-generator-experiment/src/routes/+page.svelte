<script>
//this is a placeholder for the API key, which should be stored securely in a real application
    const API_KEY = "eQp2tRUqfgob0LrPkQGiTSdh947fN2iNnV3G5AEl"

    let catImages = $state();
    let loading = $state(false);
    let errorMessage = $state('');

    async function generateCatIMG() {
        loading = true;
        errorMessage = '';

        try {
            const response = await fetch(`https://api.thecatapi.com/v1/images/search`, {
                headers: {
                    'x-api-key': API_KEY
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cat image');
            }

            const data = await response.json();
            catImages = data[0].url;
        }  catch (/** @type {any} */ err) {
			
			errorMessage = err.message;
        } finally {
            loading = false;
        }
    }
</script>

<h1>Cat Generator Experiment</h1>

<h2>
    Generate a random cat image by clicking the button below.
</h2>

 <button on:click={generateCatIMG} disabled={loading}>
    {#if loading}
        Loading...
    {:else}
    Generate Cat
    {/if}
</button>

{#if errorMessage}
  <p class="error">{errorMessage}</p>
{/if}

{#if catImages}
  <img src={catImages} alt="Random cat" />
{/if}

<style>
    h1 {
        text-align: center;
    }
</style>