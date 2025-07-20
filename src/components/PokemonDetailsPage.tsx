import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchAbilityDetailsById, fetchPokemonDetailsById, fetchPokemonEvolutionChainById } from '../api';
import { Wrapper } from './Wrapper';
import type { PokemonDetails } from '../types/pokemon-details';
import type { PokemonSpecies } from '../types/pokemon-species';
import type { PokemonEvolutionChain } from '../types/pokemon-evolution-chain';
import { Blockquote } from './Blockquote';
import { StatsTable } from './StatsTable';
import { Card } from './Card';
import type { Ability } from '../types/ability';
import { DataTable } from './DataTable';


const statNameMap: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed'
};

const typeToColorMap: Record<string, string> = {
  normal: 'bg-gray-300',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-pink-500',
  poison: 'bg-purple-500',
  ground: 'bg-brown-500',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-300',
  bug: 'bg-lime-500',
  rock: 'bg-gray-600',
  ghost: 'bg-indigo-700',
  dragon: 'bg-blue-800',
  dark: 'bg-gray-800',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-200'
};

interface PokemonDetailsPageProps {
  previousName?: string;
  nextName?: string;
}

export const PokemonDetailsPage = (props: PokemonDetailsPageProps) => {

  const params = useParams<{ id?: string; name?: string; }>();
  const pokemonSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${params.id}.svg`;
  const [pokemonDetails, setPokemonDetails] = useState<{ details: PokemonDetails, species: PokemonSpecies; }>();
  const [evolutionChain, setEvolutionChain] = useState<PokemonEvolutionChain>();
  const [abilityDetails, setAbilityDetails] = useState<Ability[]>([]);


  useEffect(() => {
    if (params.id) {
      fetchPokemonDetailsById(params.id)
        .then(({ details, species }) => {
          setPokemonDetails({ details, species });
        })
        .catch(error => {
          console.error('Error fetching Pokemon details:', error);
        });
    }
  }, [params.id]);

  useEffect(() => {
    if (pokemonDetails) {
      fetchPokemonEvolutionChainById(pokemonDetails.species.evolution_chain.url.split('/').slice(-2)[0])
        .then(chain => {
          setEvolutionChain(chain);
        })
        .catch(error => {
          console.error('Error fetching evolution chain:', error);
        });
    }
  }, [pokemonDetails]);

  useEffect(() => {
    if (pokemonDetails) {
      const promises = pokemonDetails.details.abilities.map((ability) => {
        const id = ability.ability?.url.split('/').slice(-2)[0] || "0";
        return fetchAbilityDetailsById(id);
      });

      Promise.all(promises)
        .then((fetchedAbilities) => {
          setAbilityDetails(fetchedAbilities);
          console.log(abilityDetails);
        })
        .catch(console.error);
    }
  }, [pokemonDetails]);

  const calculateMinMaxStatValueAt100 = (statName: string): { min: number; max: number; } => {
    /*
    max-EV = 31 stat points
    max-IV = 63 stat points
    beneficial nature = +10%
    negative nature = -10%

    non-HP base stat min-max can be calculated from:
    min: (2 * stat_value+ 5 (static for non-HP stats) ) * negative nature
    max: (2 * stat_value + max-EV + max-IV + 5) * beneficial nature

    HP min-max:
    min: 2 * hp_value + 110 (static for HP)
    max: 2 * hp_value + 110 + max-EV + max-IV
*/

    let maxEV = 63; // max EV for a stat
    let maxIV = 31; // max IV for a stat

    const baseStat = pokemonDetails?.details.stats.find(stat => stat.stat.name === statName)?.base_stat || 0;

    if (statName === 'hp') {
      return {
        min: 2 * baseStat + 110,
        max: 2 * baseStat + 110 + maxEV + maxIV
      };
    } else {
      return {
        min: Math.floor((2 * baseStat + 5) * 0.9),
        max: Math.floor(((2 * baseStat) + maxEV + maxIV + 5) * 1.1)
      };
    }

  };

  return (
    <Wrapper className='h-auto!'>
      <div className='text-center flex-1'>
        <div className='flex justify-between'>
          <button>
            Previous
            <div className="capitalize text-gray-500 text-sm">{props.previousName || 0}</div>
          </button>
          <button>
            Next
            <div className="capitalize text-gray-500 text-sm">{props.nextName || 0}</div>
          </button>
        </div>
        <h2 className='text-gray-600 text-md'>#{pokemonDetails?.details.id.toString().padStart(4, "0")}</h2>
        <h2 className="capitalize text-3xl font-bold">{pokemonDetails?.details.name}</h2>
        <p className="text-md  text-gray-600">
          {pokemonDetails?.species.genera.find(genus => genus.language.name === 'en')?.genus}
        </p>




      </div>
      <div className='flex items-center justify-center gap-2 flex-wrap'>
        {
          pokemonDetails?.details.types.map((type) => (
            <span className={`capitalize text-white w-fit min-w-24 inline-flex justify-center items-center rounded-md px-2 py-1 text-md font-medium ring-1 ring-slate-800/10 ring-inset ${typeToColorMap[type.type.name]}`} >
              {type.type.name}
            </span>

          ))
        }

      </div>

      <img
        src={pokemonSpriteUrl}
        onError={(e) => {
          e.currentTarget.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
        }}
        loading='lazy'

        alt={pokemonDetails?.details.name}
        className="w-64 h-64 object-contain antialiased mx-auto my-4"
        style={{ maxWidth: '100%', maxHeight: '400px' }}
      />

      <Blockquote >
        {
          pokemonDetails?.species.flavor_text_entries
            .filter(entry => entry.language.name === 'en')
            .map(entry => entry.flavor_text.replace(/\f/g, ' '))
            .sort(() => Math.random() - 0.5)[0]
        }
      </Blockquote>



      <div>Generation: {pokemonDetails?.species.generation.name}</div>


      <div className="">

        <h3 className="text-2xl font-bold mb-4">Details</h3>

        {
          pokemonDetails ? (
            <DataTable
              rows={[
                ["National pokedex number", pokemonDetails?.details.id],
                ["Height", `${pokemonDetails?.details.height / 10} m`],
                ["Weight", `${pokemonDetails?.details?.weight / 10} kg`]
              ]}
            />
          ) : (
            <div>
              loading...
            </div>
          )
        }


        {
          pokemonDetails ? (
                 <div className="mb-4">
          <h3 className="font-semibold">Abilities:</h3>
          <ul>
            {pokemonDetails?.details.abilities.map(a => (
              <li key={a.ability?.name} className="capitalize">
                <span className='font-bold'>{a.ability?.name || "unknown" }</span>

                <div className='text-gray-500'>
                  {
                    abilityDetails ? (
                      abilityDetails.filter((ability) => ability.name === a.ability?.name).map((details) => {
                        return (
                          <span>
                            {details.effect_entries.filter(d => d.language.name === "en").map((effect) => {
                              console.log(effect.short_effect);
                              return (
                                <span>
                                  {effect.short_effect}
                                </span>
                              );
                            })
                            }
                          </span>
                        );
                      })
                    ) : (
                      <div>
                        loading...
                      </div>
                    )

                  }
                </div>
              </li>
            ))}
          </ul>
        </div>
          ) :
            (
              <div>
                loading...
                </div>
            )
        }

        <StatsTable data={(pokemonDetails?.details.stats || []).map((stat) => {
          return {
            name: statNameMap[stat.stat.name],
            value: stat.base_stat,
            minMaxValues: calculateMinMaxStatValueAt100(stat.stat.name)
          };
        })} />

      </div>

      <div>
        {evolutionChain?.chain && (
          <>
            <h3 className="text-2xl font-bold mb-4">Evolution Chain</h3>

            <div className='flex flex-col items-center justify-center gap-2'>
              <Card pokemon={{ name: evolutionChain.chain.species.name, id: evolutionChain.chain.species.url.split('/').slice(-2)[0] }} />
              <span className="text-gray-500 my-2 mx-2">
                <svg height="48" width="48" style={{ rotate: '180deg' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" /></svg>
              </span>
              {evolutionChain.chain.evolves_to.map((evolution) => (
                <div key={evolution.species.name} className="mb-2">
                  <Card pokemon={{ name: evolution.species.name, id: evolution.species.url.split('/').slice(-2)[0] }} />
                  {evolution.evolves_to.length > 0 && (
                    <div className='flex flex-col items-center justify-center gap-2'>
                      <span className="text-gray-500 my-2 mx-2">
                        <svg height="48" width="48" style={{ rotate: '180deg' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" /></svg>
                      </span>
                      {evolution.evolves_to.map((subEvolution) => (
                        <Card key={subEvolution.species.name} pokemon={{ name: subEvolution.species.name, id: subEvolution.species.url.split('/').slice(-2)[0] }} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

      </div>


    </Wrapper>
  );
};
