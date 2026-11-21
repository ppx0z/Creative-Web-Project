import { error } from '@sveltejs/kit';
import { fetchPlants } from '#lib/server/plantApi.js';

export async function load({url}) {
    const light = url.searchParams.get('light');

    try {
        const plants = await fetchPlants (light);
       
        return {plants};

    
    } catch (err){
        console.error('Failed to reach the Plant API:', err.message);

        error(502, "Couldn't reach the Plant API. Is the Express server running?");
    }
}
