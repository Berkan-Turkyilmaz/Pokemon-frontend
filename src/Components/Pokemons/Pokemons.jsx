import React, { useState, useEffect, useContext } from 'react';
import './Pokemons.css';
import { AuthContext } from '../AuthContext';

export default function Pokemons() {
  const [fetchedPokes, setFetchedPokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { randomPoke, setRandomPoke, tokenBox, setTokenBox, botPoke, setBotPoke} = useContext(AuthContext); // Context'ten setRandomPoke fonksiyonunu alıyoruz

  const fetchData = async () => {
    
    setLoading(true);
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      if (!response.ok) {
        throw new Error('Couldn\'t retrieve data');
      }
      const result = await response.json();
      
      const pokemonDetails = await Promise.all(result.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        const pokemonData = await detailResponse.json();
        
        const attack = pokemonData.base_experience;
        const defence = pokemonData.stats[0]?.base_stat || 0;
    
        return { ...pokemonData, attack, defence };
      }));
  
      setFetchedPokes(pokemonDetails); // Pokémon listesini state'e atıyoruz

      const randomPokemonMathforBot = pokemonDetails[Math.floor(Math.random() * pokemonDetails.length)];
      setBotPoke(randomPokemonMathforBot);
      console.log("bot poke",randomPokemonMathforBot)

      if (!tokenBox) {
      const randomPokemonMath = pokemonDetails[Math.floor(Math.random() * pokemonDetails.length)];
      setRandomPoke(randomPokemonMath)}; // Global context'e aktarıyoruz
  
      console.log("Fetched Pokemon Details:", pokemonDetails);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
    console.log("Random Pokemon Selected:", randomPoke);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="pokemon-container">
      {fetchedPokes.map(pokemon => (
        <div key={pokemon.id} className="pokemon-card">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
          <div className="pokemon-name">{pokemon.name}</div>
          <div className="pokemon-stats">
            <p>Attack: {pokemon.attack}</p> {/* pokemon nesnesinden attack bilgisi alınıyor */}
            <p>Defence: {pokemon.defence}</p> {/* pokemon nesnesinden defence bilgisi alınıyor */}
          </div>
        </div>
      ))}
    </div>
  );
}