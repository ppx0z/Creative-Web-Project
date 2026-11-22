## Where is it decided? Which database does your Express code connect to, and where is that named? Which collection do your plants live in, and where is that named (or decided)?

My database is named plantdb. Express gets to MongoDB through the .env file, using the MONGODB_URI.

## Follow the filter. A visitor opens /shelf?light=low. List, in order, each file and function the request passes through, from the URL to MongoDB and back to the page. A short numbered list is fine.

When the user selects the Low filter, the URL sends a query parameter (light=low) to Sveltekit. Sveltkit then passes it to Express project in the file /lib/plantData.js. The getAll() function asks MongoDB to read out plants where needsLight are equal to "low"

## What is a plant's id? What does it look like in the database, in the JSON Express sends, and in the URL /shelf/<id>? Where does Express make the id the page uses, and which lines of SvelteKit code had to change because of it?

The plant id is a unique identifier given to each plant in the database. It allows the website to list the whole info for specific plant. It is stored as an ObjectID in MongoDB. 

http://localhost:5173/browse-plant/6b02342260f9324772cb683a --> If u copy paste different objectids on the last path, it gives u all the info on that plant. You can modify the last path to any other objectids and will find those plant's specific info