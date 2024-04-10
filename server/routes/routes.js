const express = require('express');
const { validationResult } = require('express-validator');
const pokemon = require('../pokedex.json');

const router = express.Router();



router.get('/pokemon', (req, res) => {
    const pokemonList = pokemon.map(p => {
        return {
            id: p.id,
            name: p.name,
            type: p.type,
            base: p.base
        };
    });
    res.json(pokemonList);
})

router.get('/pokemon/:id', (req, res) => { 
    const id = req.params.id;
    if (id >= 0 && id < pokemon.length) {
        res.json(pokemon[id - 1]);
    } else {
        res.status(404).send('⛔ Pokemon Not Found');
    }
})

router.get('/pokemon/:id/:info', (req, res) => {
    const id = parseInt(req.params.id);
    const info = req.params.info;
    const pokemonFound = pokemon.find(p => p.id === id);
    if (!pokemonFound) {
        res.status(404).send('⛔ Pokemon Not Found');
        return;
    }
    let response;
    switch (info) {
        case 'name':
            response = pokemonFound.name;
            break;
        case 'type':
            response = pokemonFound.type;
            break;
        case 'base':
            response = pokemonFound.base;
            break;
        default:
            res.status(404).send('⛔ Invalid Info');
            return;
    }

    res.json({ id, info: response });
});

module.exports = router;