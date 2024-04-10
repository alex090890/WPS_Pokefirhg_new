import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get('https://pokefight-iota.vercel.app/pokemon')
      .then((response) => setPokemons(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Here are our Pokemon champions</h1>
      <ol>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <a href={`/pokemon/${pokemon.id}`}><p>{pokemon.name.english}</p></a>
          </li>
        ))}
      </ol>
    </div>
  )
}