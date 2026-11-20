import { PLANTSWAP_API_URL } from '$app/env/private';


//GETS every plant
export async function fetchPlants() {
	// await means: pause here until Express answers, then carry on.
	const res = await fetch(`${PLANTSWAP_API_URL}/api/plants`);

	if (!res.ok) {
		throw new Error(`PlantSwap API responded with ${res.status}`);
	}

	return res.json();
}

//ADDS a plant data like {name, species, swapped, lightNeeded}
export async function createPlant(data) {
	const res = await fetch(`${PLANTSWAP_API_URL}/api/plants`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});

	if (!res.ok) {
		throw new Error(`PlantSwap API responded with ${res.status}`);
	}

	return res.json();
}

//Changes some fields of one plant --> changes { swapped: true }.
//Gives back the updated plant, or null if there is no plant with that ID
export async function updatePlant(id, changes) {
	const res = await fetch(`${PLANTSWAP_API_URL}/api/plants/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(changes)
	});

	if (res.status === 404) {
		return null;
	}

	if (!res.ok) {
		throw new Error(`PlantSwap API responded with ${res.status}`);
	}

	return res.json();
}

//Delete one plant. Gives back true if it was deleted, false if there was no sketch with that id
export async function deletePlant(id) {
	const res = await fetch(`${PLANTSWAP_API_URL}/api/plants/${id}`, {
		method: 'DELETE'
	});

	if (res.status === 404) {
		return false;
	}

	// A successful delete answers 204 (No Content), so there is no body to read.
	if (!res.ok) {
		throw new Error(`PlantSwap API responded with ${res.status}`);
	}

	return true;
}