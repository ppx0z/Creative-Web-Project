import { error } from '@sveltejs/kit';
import { fetchPlants } from '#lib/server/plantApi.js';

export async function load() {
    try {
        // await means: pause here until Express answers, then carry on.
        const plants = await fetchPlants();
        return { plants };
    } catch (err) {
        console.error('Failed to reach the Sketch API:', err.message);

        // 502 = Bad Gateway: we could not get an answer from Express.
        error(502, "Couldn't reach the Sketch API. Is the Express server running?");
    }
}
