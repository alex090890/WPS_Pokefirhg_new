import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';

export default function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
    axios.get(`https://pokefight-iota.vercel.app/pokemon/${id}`)
    .then((response) => {
        if (response.data) {
            setPokemon(response.data)
        } else {
            setPokemon('not found');
        }
    })
    .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 404) {
            setPokemon('not found');
        } else {
            setPokemon(null);
        }
    });
}, [id]);

if (!pokemon) {
    return <p>Loading...</p>
} else if (pokemon === 'not found') {
    return <p>Pokemon not found</p>
} else {
    return (
    <div>
            {pokemon && <div>
                <h1>{pokemon.name.english}</h1>
                <p>Type: {pokemon.type}</p>
                <p>HP: {pokemon.base.HP}</p>
                <p>Attack: {pokemon.base.Attack}</p>
                <p>Defense: {pokemon.base.Defense}</p>
                <p>Special Attack: {pokemon.base['Sp. Attack']}</p>
                <p>Special Defense: {pokemon.base['Sp. Defense']}</p>
                <p>Speed: {pokemon.base.Speed}</p>
            </div>}
            <a href={'/pokemon'}><p>Return to the list of pokemons</p></a>
            <a href={'/'}>Return to the homepage</a>
            <Footer />
    </div>
    );
}
}