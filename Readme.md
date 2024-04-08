PART I: NodeJS API with ExpressJS
Create an empty ExpressJS application.
Download the following JSON: https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json  and use this file for the following 3 routes. You can store this file at the root of your application and import it as a JSON file (with require()) 
let jsonData = require(‘./file.json’)

Create a GET route on /pokemon which gives the complete list of pokemon from the JSON
Create a GET route on /pokemon/:id which gives only one pokemon from the JSON thanks to its id
(Optional) Create a GET route on /pokemon/:id/:info (||) which gives only one pokemon from the JSON thanks to its id and retrieve only one information (name or type or base) to send back to the client
(Optional): Use the MVC pattern; your routes should be managed by a router; which in return triggers a controller that will access the correct Pokemon resources
Enable all the CORS: https://expressjs.com/en/resources/middleware/cors.html 
http://en.wikipedia.org/wiki/Cross-origin_resource_sharing

Host your API on Heroku: https://devcenter.heroku.com/articles/deploying-nodejs
 

PART II: React Application 
Create a react app 
Create 3 routes with react-router-dom (https://reacttraining.com/react-router/web/api/Route) 
/  -> Returns all the pokemon names in a list and includes a link to the detailed view  
/pokemon/:id -> Detailed view with the name, type and base 
/pokemon/:id/:info -> Super detailed view with only the names or the types and or the bases
Each route will gather information from your API 
Host your React application on Netlify: https://www.netlify.com/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/
 

PART III: Pokefight 
Turn this app into a game; use a UI library of your choice (like this one, or this, or this, or this, or this, or this, or this, or any other you want to experiment with) to do the following:
Allow the user to choose the Pokemon he will fight with from the list of available Pokemons (you can choose which way you see fit: choose by browsing a list of available Pokemons, search by name, assign a random Pokemon…)
In the UI show which Pokemons are going to fight, and their respective infos. You have some basic data about each Pokemon from the JSON file we use, but you can also get more information about each of them (like pictures…) by targeting this external API if you want.
Define a game mechanism, how to win, and implement that logic into your React app. How are the Pokemons going to fight? They have HP, Attack, Defense, Speed… characteristics which you could use, but you can come up with any game system you want! Make it fun 🙂
PART IV: Show the high scores
Create a MongoDB database on MongoDB Atlas, to save information about each game played
Establish a Mongoose client to connect to your database
Create a Game schema and model in the appropriate models folder.
Create a route in your back-end (like /game/save) where you will send the result of each game (which Pokemon won against who, in how many turns and any other info you feel necessary). You’ll save this game data in your DB.
Create a route (like /game/leaderboard) where the front-end can retrieve all the previous games infos
Your React app should then have a /leaderboard route where the information of the previous games will be displayed.
 

This is a full-stack application, we recommend that you spend some time polishing it, host everything online and link it in your portfolio!