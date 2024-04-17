const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.use('/', routes);

const uri = "mongodb+srv://alexprofteach:ilya2003@cluster0.onuyksa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/pokefight";
console.log(uri);

const client = new MongoClient(uri);
const dbname = "winners";

mongoose.connect(uri);


const winnerSchema = new mongoose.Schema({
  randomPokemonPower: {
    type: Number,
    required: true
    },
    selectedPokemonPower: {
        type: Number,
        required: true
    },
    winner: {
        type: String,
        required: true
    }
});

const Winner = mongoose.model('Winner', winnerSchema);

app.get('/', (req, res) => {
    res.send('<h1>🚀 Welcome to the Pokemon API 🚀</h1>');
});


app.post('/saveData', async (req, res) => {
  const { randomPokemonPower, selectedPokemonPower, winner } = req.body;

  if (!randomPokemonPower || !selectedPokemonPower || !winner) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newWinner = new Winner({ randomPokemonPower, selectedPokemonPower, winner });
    await newWinner.save();
    res.status(201).json(newWinner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running :database: on port ${PORT}`);
});