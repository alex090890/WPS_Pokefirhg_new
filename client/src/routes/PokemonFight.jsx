import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Footer from './Footer';

const PokemonFight = () => {
  let [pokemonList, setPokemonList] = useState([]);
  let [selectedPokemonId, setSelectedPokemonId] = useState(null);
    let [randomPokemon, setRandomPokemon] = useState(null);
    let handleReload = () => {window.location.reload()};

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

  return (
    <div>
      <div>
        <h2>Choose your hero:</h2>
      <select value={selectedPokemonId || ''} onChange={handleSelectChange}>
        <option value="">Select a Pokemon</option>
        {pokemonList && pokemonList.map && pokemonList.map(pokemon => (
          <option key={pokemon.id} value={pokemon.id}>
            {pokemon.name.english}
          </option>
        ))}
      </select>

        {selectedPokemonId && (
                  <div>
                      <ul>
                            <li>HP: {selectedPokemonHp}</li>
                            <li>Attack: {selectedPokemonAttack}</li>
                            <li>Defense: {selectedPokemonDefense}</li>
                            <li>Special Attack: {selectedPokemonSpAt}</li>
                            <li>Special Defense: {selectedPokemonSpDef}</li>
                            <li>Speed: {selectedPokemonSpeed}</li>
                      </ul>
                      <p>
            The total Power your Pokemon of {pokemonList.find(pokemon => pokemon.id === selectedPokemonId).name.english} is{' '}
            {selectedPokemonPower}
          </p>
          </div>
        )}
      </div>
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
        
          </div>
          
          {selectedPokemonId ? (
              <div>
              <h2>Who is the winner?</h2>
              <p>{winner}</p>
              <button onClick={handleReload}>Restart</button>
              <a href={ '/'}><p>Home</p></a>
          </div>
          ) : (
            <div>Please select a pokemon to play</div>
      )}
      <Footer />
    </div>
  );
};

export default PokemonFight;