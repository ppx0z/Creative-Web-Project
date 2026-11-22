<script>
  let { data } = $props();
</script>

<main class="plant-page">
  {#if data.plant}
    <div class="plant-card">
      <div class="plant-header">
        <span class="plant-label"> Plant Information</span>
        <h1>{data.plant.name}</h1>
        <p class="sub">Your plant details</p>
      </div>

      <div class="plant-info">
        <div class="info-row">
          <span>Species</span>
          <strong>{data.plant.species}</strong>
        </div>

        <div class="info-row">
          <span>Swapped</span>
          <strong>{data.plant.swapped ? "Unavailable" : "Available"}</strong>
        </div>

        <div class="info-row">
          <span>Light needs</span>
          <strong>{data.plant.needsLight}</strong>
        </div>
      </div>

      <a href="/browse-plant" class="back-button"> ← Back to Browse Plants </a>
    </div>
  {:else}
    <div class="plant-card not-found">
      <h1>Plant Not Found</h1>
      <p>Sorry, this plant could not be found.</p>
      <a href="/browse-plant" class="back-button"> ← Back to Browse Plants </a>
    </div>
  {/if}
</main>

<style>
  .plant-page {
    min-height: 80vh;
    background: #f1f5ed;
    padding: 3rem 1.5rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .plant-card {
    background: white;
    width: 100%;
    max-width: 40rem;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    border: 1px solid #e0e8dc;
  }

  .plant-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .plant-label {
    display: inline-block;
    background: #e5efe3;
    color: #315b3d;
    padding: 0.5rem 1rem;
    border-radius: 1.2rem;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    font-family: system-ui, sans-serif;
  }

  .plant-header h1 {
    color: #28543a;
    font-size: 2rem;
    margin: 10px 0;
    font-family: system-ui, sans-serif;
  }

  .sub {
    color: #89958a;
    font-size: 1rem;
    font-family: system-ui, sans-serif;
  }

  .plant-info {
    border-top: 1px solid #e8eee5;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 20px 5px;
    border-bottom: 1px solid #e8eee5;
  }

  .info-row span {
    color: #788579;
    font-size: 16px;
    font-family: system-ui, sans-serif;
  }

  .info-row strong {
    color: #315b3d;
    font-size: 16px;
    text-align: right;
    font-family: system-ui, sans-serif;
  }

  .back-button {
    display: inline-block;
    margin-top: 30px;
    padding: 14px 22px;
    background: #28543a;
    color: white;
    text-decoration: none;
    border-radius: 10px;
    font-weight: 600;
    transition: 0.3s ease;
    font-family: system-ui, sans-serif;
  }

  .back-button:hover {
    background: #3e704d;
    transform: translateY(-2px);
  }

  .not-found {
    text-align: center;
  }

  .not-found h1 {
    color: #28543a;
  }

  .not-found p {
    color: #788579;
  }
</style>
