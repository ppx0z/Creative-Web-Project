//VERY IMPORTANT
//place where all the database work for plants 

import Plant from '../models/Plant.js';

// READ — filter select and diplays in on the page.
//e.g. - if 'low' is selected then it returns the plants with low lights 
//if no filter is selected then all plants are returned
export async function getAll(light) {
    
    if(light) {
        return Plant.find({ needsLight: light});
    }
    return Plant.find();
}

// CREATE — save a new plant. `data` holds title, artist and colorTag.
// Gives back the saved plant.
export async function create(data) {
    return Plant.create(data);
}

// UPDATE — change some fields of one plant, found by its id.
// { new: true } makes it give back the plant AFTER the change.
// runValidators: true checks the changes against the schema's rules.
// Gives back null if there is no plant with that id.
export async function update(id, changes) {
    return Plant.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
}

// DELETE — remove one plant, found by its id.
// Gives back the removed plant, or null if there was none with that id.
export async function remove(id) {
    return Plant.findByIdAndDelete(id);
}
