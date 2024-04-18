import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Footer from './Footer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './styles/PokemonFight.css';


const PokemonFight = () => {
  let [pokemonList, setPokemonList] = useState([]);
  let [selectedPokemonId, setSelectedPokemonId] = useState(null);
    let [randomPokemon, setRandomPokemon] = useState(null);
    let handleReload = () => {window.location.reload()};
 const navigate = useNavigate();
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

  useEffect(() => {
    if (pokemonList.length > 0) {
      let randomIndex = Math.floor(Math.random() * pokemonList.length);
      setRandomPokemon(pokemonList[randomIndex]);
    }
  }, [pokemonList]);

    let randomPokemonHP = randomPokemon ? randomPokemon.base.HP : null;
    let randomPokemonAttack = randomPokemon ? randomPokemon.base.Attack : null;
    let randomPokemonSpAt = randomPokemon ? randomPokemon.base['Sp. Attack'] : null;
    let randomPokemonSpDef = randomPokemon ? randomPokemon.base['Sp. Defense'] : null;
    let randomPokemonSpeed = randomPokemon ? randomPokemon.base.Speed : null;
    let randomPokemonDefense = randomPokemon ? randomPokemon.base.Defense : null;
    let selectedPokemonHp = selectedPokemonId ? pokemonList.find(pokemon => pokemon.id === selectedPokemonId).base.HP : null;
    let selectedPokemonAttack = selectedPokemonId ? pokemonList.find(pokemon => pokemon.id === selectedPokemonId).base.Attack : null;
    let selectedPokemonSpAt = selectedPokemonId ? pokemonList.find(pokemon => pokemon.id === selectedPokemonId).base['Sp. Attack'] : null;
    let selectedPokemonSpDef = selectedPokemonId ? pokemonList.find(pokemon => pokemon.id === selectedPokemonId).base['Sp. Defense'] : null;
    let selectedPokemonSpeed = selectedPokemonId ? pokemonList.find(pokemon => pokemon.id === selectedPokemonId).base.Speed : null;
    let selectedPokemonDefense = selectedPokemonId ? pokemonList.find(pokemon => pokemon.id === selectedPokemonId).base.Defense : null;

    let randomPokemonPower = randomPokemonAttack + randomPokemonSpAt + randomPokemonSpDef + randomPokemonSpeed + randomPokemonDefense + randomPokemonHP
    console.log(`Total power of random Pokemon: ${randomPokemonPower}`)

    let selectedPokemonPower = selectedPokemonAttack + selectedPokemonSpAt + selectedPokemonSpDef + selectedPokemonSpeed + selectedPokemonDefense + selectedPokemonHp
    console.log(`Total power of selected Pokemon: ${selectedPokemonPower}`)

    let winner;
    if (!selectedPokemonPower && !randomPokemonPower) { 
        winner = 'Please select a Pokemon to start the game!'
    } else if (selectedPokemonPower > randomPokemonPower) {
        winner = 'Congratulations! Your pokemon has won! You are a true Pokemon Master! Click on "Restart" to try your luck one more time!'
    } else if (selectedPokemonPower < randomPokemonPower) {
        winner = 'Oops! You have lost the game! Click on "Restart" to try your luck one more time!'

    } else {
        winner = 'It is a draw! Click on "Restart" to try your luck one more time!'
    };
  console.log(winner);
  
  const saveDataToMongoDB = async () => {
    const data = {
      winner
    };

    const response = await fetch('/saveData', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };

  return (
    <div>
      <div>
        <h2>Choose your hero:</h2>
      <select value={selectedPokemonId || ''} onChange={handleSelectChange} className='selectmenu'>
        <option value="" className='option'>Select a Pokemon</option>
        {pokemonList && pokemonList.map && pokemonList.map(pokemon => (
          <option key={pokemon.id} value={pokemon.id} className='option'>
            {pokemon.name.english}
          </option>
        ))}
      </select>

        {selectedPokemonId && (
                  <div>
            <Card className='details-card'>
              <Card.Header>
                <h3>{pokemonList.find(pokemon => pokemon.id === selectedPokemonId).name.english}</h3>
            <p>Type: {pokemonList.find(pokemon => pokemon.id === selectedPokemonId).type.join(', ')}</p>
                </Card.Header>
              <Card.Body>
                            <p>HP: {selectedPokemonHp}</p>
                            <p>Attack: {selectedPokemonAttack}</p>
                            <p>Defense: {selectedPokemonDefense}</p>
                            <p>Special Attack: {selectedPokemonSpAt}</p>
                            <p>Special Defense: {selectedPokemonSpDef}</p>
              <p>Speed: {selectedPokemonSpeed}</p>
              </Card.Body>
              <Card.Footer>The total Power your Pokemon of {pokemonList.find(pokemon => pokemon.id === selectedPokemonId).name.english} is{' '}
            {selectedPokemonPower}</Card.Footer>
            </Card>
          </div>
        )}
      </div>
      <div>
        {randomPokemon && (
          <div>
            <h2>Meet your opponent:</h2>
            <Card className='details-card'>
              <Card.Header>
                <h3>{randomPokemon.name.english}</h3>
            <p>Type: {randomPokemon.type.join(', ')}</p>
            </Card.Header>
            <Card.Body>
              {Object.entries(randomPokemon.base).map(([key, value]) => (
                <p key={key}>
                  {key}: {value}
                </p>
              ))}
              </Card.Body>
              <Card.Footer>The total Power of the random Pokemon is{' '}
            {randomPokemonPower}</Card.Footer>
              </Card>
          </div>
        )}
        
          </div>
          
          {selectedPokemonId ? (
              <div>
              <h2>Who is the winner?</h2>
              <p className='winnertext'>{winner}</p>
              <Button variant='danger' onClick={() => { handleReload(); saveDataToMongoDB(); }}>Restart</Button>
              
          </div>
          ) : (
            <div className='winnertext'>Please select a pokemon to play</div>
      )}
      <p>* In case the list of pokemons and the information about them is not loaded, please restart the page.</p>
      <Button variant='info' onClick={() => navigate(`/pokemon`)} className='navbutton'>Return to the list of pokemons</Button>
                        <Button variant='info' onClick={() => navigate(`/`)} className='navbutton'>Return to Homepage</Button>
      <Footer />
    </div>
  );
};

export default PokemonFight;