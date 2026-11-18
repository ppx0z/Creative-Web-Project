//VERY IMPORTANT!!!
//This file defines what fields each plant should have
//What the data types are
//It creates a mongoose model that lets the API interact with the MongooseDB collection 'plants'
import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        species: { type: String, required: true },
        swapped: { type: Boolean, default: false },
        needsLight: { type: String, required: true, enum: ['low', 'medium', 'bright'] }
    },
    {
        toJSON: { virtuals: true }
    }
);

const Plant = mongoose.model('Plant', plantSchema);

export default Plant;