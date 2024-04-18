import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import Card from 'react-bootstrap/Card';
import './styles/PokemonDetails.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const navigate = useNavigate();

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
                <Card className='details-card'>
                    <Card.Header>
                        <Card.Title className='bungee-spice-regular'>{pokemon.name.english}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Type: {pokemon.type.join(', ')}</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <p>HP: {pokemon.base.HP}</p>
                        <p>Attack: {pokemon.base.Attack}</p>
                        <p>Defense: {pokemon.base.Defense}</p>
                        <p>Special Attack: {pokemon.base['Sp. Attack']}</p>
                        <p>Special Defense: {pokemon.base['Sp. Defense']}</p>
                        <p>Speed: {pokemon.base.Speed}</p>
                        
                    </Card.Body>
                    <Card.Footer>
                        <Button variant='info' onClick={() => navigate(`/pokemon`)} className='navbutton'>Return to the list of pokemons</Button>
                        <Button variant='info' onClick={() => navigate(`/`)} className='navbutton'>Return to Homepage</Button>
                    </Card.Footer>
                </Card>
                <Footer />
            </div>
        );
    }
}