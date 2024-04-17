import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomPokemonPicker = () => {
  const [pokemonList, setPokemonList] = useState([]);
    const [randomPokemon, setRandomPokemon] = useState(null);
    const handleReload = () => {window.location.reload()};

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokefight-iota.vercel.app/pokemon');
        setPokemonList(response.data);
      } catch (error) {
        console.error('Error fetching pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      setRandomPokemon(pokemonList[randomIndex]);
    }
  }, [pokemonList]);

  return (
    <div>
      {randomPokemon && (
        <div>
          <h2>Meet your opponent:</h2>
          <h3>{randomPokemon.name.english}</h3>
          <p>Type: {randomPokemon.type.join(', ')}</p>
          <p>Base Stats:</p>
          <ul>
            {Object.entries(randomPokemon.base).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
          )}
          <button onClick={handleReload}>Get a new opponent</button>
    </div>
  );
};

export default RandomPokemonPicker;