//VERY IMPORTANT!!!
//server side file that handles the changes made in some fields (checking if plant is swapped or not)
//also handles removing the plants

import { json } from '@sveltejs/kit';
import { getPlant, updatePlant, deletePlant } from '#lib/server/plantApi.js';

//PATCH --> update specific field
export async function PATCH({ params, request }) {
    let changes;
    try {
        changes = await request.json();
    } catch (err) {
        return json({ error: 'Send a JSON body of changes' }, { status: 400 });
    }

    try {
        const updated = await updatePlant(params.id, changes);

        // 404 = Not Found: Express answered, but no plant has this id.
        if (!updated) {
            return json({ error: `No plant found with id ${params.id}` }, { status: 404 });
        }

        return json(updated);
    } catch (err) {
        console.error('Failed to update plant via Express:', err.message);
        return json({ error: 'Could not reach the Plant API' }, { status: 502 });
    }
}

//DELETE --> remove data
export async function DELETE({ params }) {
    try {
        const wasDeleted = await deletePlant(params.id);

        if (!wasDeleted) {
            return json({ error: `No plant found with id ${params.id}` }, { status: 404 });
        }

        // 204 = No Content: it worked, and there is nothing to send back.
        // A 204 has no body, so we send a bare Response instead of json().
        return new Response(null, { status: 204 });
    } catch (err) {
        console.error('Failed to delete plant via Express:', err.message);
        return json({ error: 'Could not reach the Plant API' }, { status: 502 });
    }
}

export async function GET({ params }) {
    try {
        const plant = await getPlant(params.id);

        if (!plant) {
            return json(
                { error: `No plant found with id ${params.id}` },
                { status: 404 }
            );
        }

        return json(plant);

    } catch (err) {
        console.error('Failed to get plant:', err.message);

        return json(
            { error: 'Could not reach the Plant API' },
            { status: 502 }
        );
    }
}
