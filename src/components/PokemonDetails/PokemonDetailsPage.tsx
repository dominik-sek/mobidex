import React, { useEffect, useState, version } from 'react';
import { useParams } from 'react-router';
import { fetchAbilityDetailsById, fetchMoveDetailsById, fetchPokemonDetailsById, fetchPokemonEvolutionChainById } from '../../api';
import { Wrapper } from '../Wrapper';
import type { PokemonDetails } from '../../types/pokemon-details';
import type { PokemonSpecies } from '../../types/pokemon-species';
import type { PokemonEvolutionChain } from '../../types/pokemon-evolution-chain';
import type { LevelUpMoveWithDetails, Move } from '../../types/move';
import { StatsTable } from './StatsTable';
import type { Ability } from '../../types/ability';
import { DataTable } from '../DataTable';
import EvolutionChain from '../EvolutionChain/EvolutionChain';
import { calculateMinMaxStatValueAt100 } from '../../helpers/calculate-min-max-stat';
import { DetailsNavigation } from './DetailsNavigation';
import { DetailsHeader } from './DetailsHeader';
import { FlavorImage } from './FlavorImage';
import { Tooltip } from '../Tooltip';


const statNameMap: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed'
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
  const [moveDetails, setMoveDetails] = useState<LevelUpMoveWithDetails[]>([]);

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
        })
        .catch(console.error);
    }
  }, [pokemonDetails]);

  useEffect(() => {
    if (pokemonDetails) {
      const moves = pokemonDetails.details.moves;

      const levelUpMoves = moves.map((move) => {
        const levelUpDetails = move.version_group_details.filter((version) => {
          return version.move_learn_method.name === "level-up";
        });
        if (levelUpDetails.length === 0) return null;

        const firstDetail = levelUpDetails[0];
        return {
          name: move.move.name,
          fromLevel: firstDetail.level_learned_at,
          versionName: firstDetail.version_group.name,
          url: move.move.url
        };
      })
        .filter(Boolean)
        .sort((a, b) => (a!.fromLevel ?? 0) - (b!.fromLevel ?? 0)); // sort by level

      const promises = levelUpMoves.map(async (move) => {
        const id = move?.url.split('/').slice(-2)[0] || "0";
        const details = await fetchMoveDetailsById(id);
        return {
          ...move,
          ...details
        } as LevelUpMoveWithDetails;
      });

      Promise.all(promises)
        .then((fetchedMoves) => {
          setMoveDetails(fetchedMoves);
          console.log(fetchedMoves[0]);
        })
        .catch(console.error);
    }
  }, [pokemonDetails]);

  const renderMoveTableRows = () => {

    return moveDetails.map((move) => {
      let englishName = move.names.find((move) => {
        return move.language.name === "en";
      });
      return [
        move.fromLevel,
        englishName?.name,
        move.type.name,
        move.power,
        move.accuracy
      ];
    });
  };
  console.log(renderMoveTableRows());

  const getAbilityDesciprtion = (abilityName: string | undefined) => {
    if (!abilityName) return "";
    const match = abilityDetails.find((ability) => ability.name === abilityName);
    if (!match) return "";

    const englishDescription = match.effect_entries.find((entry) => entry.language.name === "en");

    return englishDescription?.short_effect || "";
  };

  const getPokemonAbilities = (): React.ReactNode => {
    if (!pokemonDetails?.details.abilities) return null;

    return (
      <ol className="list-decimal space-y-1">
        {pokemonDetails.details.abilities.map((ability) => (
          <li key={ability.ability?.name} className="capitalize ">
            <Tooltip
              name={ability.ability?.name || "Unknown"}
              description={getAbilityDesciprtion(ability.ability?.name) || "No description available."}
            />
          </li>
        ))}
      </ol>
    );
  };


  if (!pokemonDetails) {
    return <div>
      loading...
    </div>;
  } else {
    return (
      <Wrapper className='h-auto!'>

        <div className='text-center flex-1 '>
          <DetailsNavigation />
          <DetailsHeader details={pokemonDetails} />
        </div>

        <FlavorImage details={pokemonDetails} spriteUrl={pokemonSpriteUrl} />

        <div className="flex flex-col gap-6">
          <div className='flex-1'>
          <div className='mb-6'>
              <h3 className="text-2xl font-bold ">Stats</h3>
              <span className='text-gray-600'>Min and Max values are calculated for Lv. 100 Pokemon</span>
            </div>

        <StatsTable data={(pokemonDetails?.details.stats || []).map((stat) => {
                    return {
                      name: statNameMap[stat.stat.name],
                      value: stat.base_stat,
                      minMaxValues: calculateMinMaxStatValueAt100(stat.stat.name, pokemonDetails.details.stats)
                    };
        })} />
            </div>
          {
            pokemonDetails ? (
              <div className='flex-1'>
                <h3 className="text-2xl font-bold mb-4">Details</h3>
                <DataTable
                  rows={[
                    ["National №", pokemonDetails?.details.id],
                    ["Height", `${pokemonDetails?.details.height / 10} m`],
                    ["Weight", `${pokemonDetails?.details?.weight / 10} kg`],
                    ["Abilities", getPokemonAbilities()]
                  ]}
                />
              </div>
            ) : (
              <div>
                loading...
              </div>
            )
          }


          
          <div className='flex-1'>
            <div className='mb-6'>
              <h3 className="text-2xl font-bold ">Moves</h3>
              <span className='text-gray-600'>Moves learned by leveling up</span>
            </div>
            <DataTable
              headers={[
                "Lv.",
                "Move",
                "Type",
                "Power",
                "Acc"
              ]}
              rows={[
                ...renderMoveTableRows()
              ]}
            />
          </div>

        </div>


        {
          evolutionChain &&
          <EvolutionChain evolutionChain={evolutionChain} />
        }


      </Wrapper>
    );
  }
};
