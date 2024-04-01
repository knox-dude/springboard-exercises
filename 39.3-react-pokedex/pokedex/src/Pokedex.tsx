import Pokecard from './Pokecard';

interface Pokemon {
  id: number;
  name: string;
  type: string;
  base_experience: number;
}

interface PokedexProps {
  pokemonData?: Pokemon[];
}

const defaultPokemonData: Pokemon[] = [
  {id: 4, name: 'Charmander', type: 'fire', base_experience: 62},
  {id: 7, name: 'Squirtle', type: 'water', base_experience: 63},
  {id: 11, name: 'Metapod', type: 'bug', base_experience: 72},
  {id: 12, name: 'Butterfree', type: 'flying', base_experience: 178},
  {id: 25, name: 'Pikachu', type: 'electric', base_experience: 112},
  {id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95},
  {id: 94, name: 'Gengar', type: 'poison', base_experience: 225},
  {id: 133, name: 'Eevee', type: 'normal', base_experience: 65}
];

function Pokedex ({ pokemonData }: PokedexProps) {
  const dataToUse = pokemonData && pokemonData.length > 0 ? pokemonData : defaultPokemonData;

  return (
    <div className="pokedex row m-2 p-2">
        <h3 style={{width: '100%', textAlign: "center", color: "GrayText"}}>Pokedex</h3>
      {dataToUse.map(pokemon => (
        <Pokecard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          type={pokemon.type}
          base_experience={pokemon.base_experience}
        />
      ))}
    </div>
  );
}

export default Pokedex;
