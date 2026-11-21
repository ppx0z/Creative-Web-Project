export async function load({params, fetch}) {
    const response = await fetch(`/api/plants/${params.id}`);

    if (!response.ok) {
    return {
      plant: null
    };
  }

  const plant = await response.json();

  return {
    plant
  };
}