import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const PokemonSearch = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const selectedPokemonHpRef = useRef(null);

  const handleSelectChange = (event) => {
    setSelectedPokemonId(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    axios.get('https://pokefight-iota.vercel.app/pokemon')
      .then(response => {
        setPokemonList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const selectedPokemonHp = selectedPokemonId ? pokemonList.find(pokemon => pokemon.id === selectedPokemonId).base.HP : null;

  if (selectedPokemonHpRef.current !== selectedPokemonHp) {
    console.log(selectedPokemonHp);
    selectedPokemonHpRef.current = selectedPokemonHp;
  }

  return (
    <div>
      <h2>Choose your hero:</h2>
      <select value={selectedPokemonId || ''} onChange={handleSelectChange}>
        {pokemonList && pokemonList.map && pokemonList.map(pokemon => (
          <option key={pokemon.id} value={pokemon.id}>
            {pokemon.name.english}
          </option>
        ))}
      </select>

      {selectedPokemonId && (
        <p>
          The HP of {pokemonList.find(pokemon => pokemon.id === selectedPokemonId).name.english} is{' '}
          {selectedPokemonHp}
        </p>
      )}
    </div>
  );
};

export default PokemonSearch;