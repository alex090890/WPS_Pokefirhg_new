import { useState, useEffect } from 'react';
import axios from 'axios';
import Dance from '../../public/dab-dance.gif'

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
      <img src={Dance} alt="Dab Dance" className="dab-dance" /> 
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