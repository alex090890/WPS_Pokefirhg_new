import { useState, useEffect } from 'react';
import axios from 'axios';
import Dance from '../../public/dab-dance.gif'
import './styles/PokemonList.css'
import Footer from './Footer';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://pokefight-iota.vercel.app/pokemon')
      .then((response) => setPokemons(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1 className='bungee-spice-regular'>Here are our Pokemon champions</h1>
      <img src={Dance} alt="Dab Dance" className="dab-dance" /> 
      <Button variant='info' onClick={() => navigate(`/`)}>Return to Homepage</Button>
      <div className='list-container'>
        {pokemons.map((pokemon) => (
          <Button key={pokemon.id} variant="outline-warning" className='list-item' onClick={() => navigate(`/pokemon/${pokemon.id}`)}>
    <p>{pokemon.name.english}</p>
  </Button>
        ))}
      </div>
      <Footer />
    </div>
  )
}