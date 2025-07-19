import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import { fetchPokemonDetailsById } from '../api';

export const PokemonDetails = () => {
  const params = useParams<{ id?: string; name?: string; }>()

  const [pokemonDetails, setPokemonDetails] = useState(null);
  useEffect( () => {
    if (params.id) {
      fetchPokemonDetailsById(params.id)
        .then(([details, species]) => {
          setPokemonDetails({ ...details, species: species });
        })
        .catch(error => {
          console.error('Error fetching Pokemon details:', error);
        });
    }
  }, [params.id]);
  console.log(pokemonDetails);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h2 className="text-2xl font-bold mb-4">Pokemon Details</h2>
      <p className="text-lg">This is where the details of a specific Pokemon will be displayed.</p>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/${params.id}.png`} alt="Pokemon Sprite" className="mt-4" />
      <p className="text-sm text-gray-500">Example Pokemon: {pokemonDetails?.species?.name}</p>
      <button
        onClick={() => window.history.back()}
        className="mt-4 rounded-md bg-slate-800 py-2 px-3 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        Go Back
      </button>
      <div className="mt-4">
        <button className="rounded-md bg-slate-800 py-2 px-3    
          border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          View More Details
        </button>
      </div>
    </div>
  )
}
