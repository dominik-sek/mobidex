import { Link, useParams } from 'react-router';
import { fetchAbilityDetailsById, fetchMoveDetailsById, fetchPokemonDetailsById, fetchPokemonEvolutionChainById } from '../../api';
import { Wrapper } from '../Wrapper';
import type { PokemonDetails } from '../../types/pokemon-details';
import { type PokemonSpecies } from '../../types/pokemon-species';
import type { PokemonEvolutionChain } from '../../types/pokemon-evolution-chain';
import type { LevelUpMoveWithDetails } from '../../types/move';
import { StatsTable } from './StatsTable';
import type { Ability } from '../../types/ability';
import { DataTable } from '../DataTable';
import EvolutionChain from '../EvolutionChain/EvolutionChain';
import { calculateMinMaxStatValueAt100 } from '../../helpers/calculate-min-max-stat';
import { DetailsHeader } from './DetailsHeader';
import { FlavorImage } from './FlavorImage';
import { Tooltip } from '../Tooltip';
import { renderMoveTableRows } from '../../helpers/render-move-table-rows';
import { LoadingScreen } from '../LoadingScreen';
import { LoadingSpinner } from '../LoadingSpinner';
import { getAbilityDescription } from '../../helpers/get-ability-description';
import { useFetch } from '../../hooks/useFetch';
import { ErrorPage } from '../ErrorPage';
import { statNameMap } from '../../helpers/stat-name-mapper';
import { Arrow } from '../../icons/Arrow';




export const PokemonDetailsPage = () => {

  const params = useParams<{ id?: string; name?: string; }>();
  const pokemonSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${params.id}.svg`;


  const {
    data: pokemonDetails,
    loading: loadingPokemon,
    error: pokemonDetailsError
  } = useFetch<{
    details: PokemonDetails;
    species: PokemonSpecies;
  }>(() => fetchPokemonDetailsById(params.id as string), [params.id]);

  const evolutionChainId = pokemonDetails?.species.evolution_chain.url.split('/').slice(-2)[0];

  const {
    data: evolutionChain,
    loading: evolutionChainLoading,
    error: evolutionChainError
  } = useFetch<PokemonEvolutionChain>(() => fetchPokemonEvolutionChainById(evolutionChainId as string), [pokemonDetails]);

  const {
    data: abilityDetails,
    loading: loadingAbilities,
    error: abilitiesError,
  } = useFetch<Ability[]>(
    async () => {
      if (!pokemonDetails) return [];
      const promises = pokemonDetails.details.abilities.map((ability) => {
        const id = ability.ability?.url.split('/').slice(-2)[0] || "0";
        return fetchAbilityDetailsById(id);
      });
      return Promise.all(promises);
    },
    [pokemonDetails]
  );


  const {
    data: moveDetails,
    loading: loadingMoves,
    error: movesError,
  } = useFetch<LevelUpMoveWithDetails[]>(
    async () => {
      if (!pokemonDetails) return [];

      const levelUpMoves = pokemonDetails.details.moves
        .map((move) => {
          const levelUpDetails = move.version_group_details.filter(
            (v) => v.move_learn_method.name === "level-up"
          );
          if (levelUpDetails.length === 0) return null;

          const firstDetail = levelUpDetails[0];
          return {
            name: move.move.name,
            fromLevel: firstDetail.level_learned_at ?? 0,
            versionName: firstDetail.version_group.name,
            url: move.move.url,
          };
        })
        .filter(Boolean)
        .sort((a, b) => (a!.fromLevel ?? 0) - (b!.fromLevel ?? 0));

      const promises = levelUpMoves.map(async (move) => {
        const id = move!.url.split("/").slice(-2)[0];
        const details = await fetchMoveDetailsById(id);
        return { ...move!, ...details } as LevelUpMoveWithDetails;
      });

      return Promise.all(promises);
    },
    [pokemonDetails]
  );



  const getPokemonAbilities = (): React.ReactNode => {
    if (!pokemonDetails?.details.abilities) return <LoadingSpinner />;;
    if (!abilityDetails) return <LoadingSpinner />;

    return (
      <ol className="list-decimal space-y-1">
        {pokemonDetails.details.abilities.map((ability) => (
          <li key={ability.ability?.name} className="capitalize ">
            <Tooltip
              name={ability.ability?.name || "Unknown"}
              description={getAbilityDescription(ability.ability?.name, abilityDetails) || "No description available."}
            />
          </li>
        ))}
      </ol>
    );
  };



  if (loadingPokemon) {
    return <LoadingScreen />;
  }

  if (pokemonDetails) {
    return (
      <Wrapper className='h-auto!'>
        <div className="mb-4">
          <Link to='/' className="h-10 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md shadow-sm transition-colors border border-gray-200">
            <Arrow className="w-4 h-4 -rotate-90" />
            <span>Back to search</span>
          </Link>
        </div>

        <div className='text-center flex-1 '>
          <DetailsHeader details={pokemonDetails} />
        </div>

        <FlavorImage details={pokemonDetails} spriteUrl={pokemonSpriteUrl} />

        <div className="flex flex-col gap-6">
          <div className='flex-1'>
            <div className='mb-6'>
              <h3 className="text-2xl font-bold ">Stats</h3>
              <span className='text-gray-600'>Min and Max values are calculated for Lv. 100 Pokemon</span>
            </div>

            <StatsTable data={(pokemonDetails.details.stats || []).map((stat) => {
              return {
                name: statNameMap[stat.stat.name],
                value: stat.base_stat,
                minMaxValues: calculateMinMaxStatValueAt100(stat.stat.name, pokemonDetails.details.stats)
              };
            })} />
          </div>


          <div className='flex-1'>
            <h3 className="text-2xl font-bold mb-4">Details</h3>
            {loadingAbilities && <LoadingSpinner />}
            {!loadingAbilities && abilitiesError && (
              <div className="text-red-500">{abilitiesError.message}</div>

            )}
            {!loadingAbilities && !abilitiesError && abilityDetails && (
              <DataTable
                rows={[
                  ["National №", pokemonDetails.details.id],
                  ["Height", `${pokemonDetails.details.height / 10} m`],
                  ["Weight", `${pokemonDetails.details.weight / 10} kg`],
                  ["Abilities", getPokemonAbilities()]
                ]}
              />
            )}
          </div>




          <div className='flex-1'>
            <div className='mb-6'>
              <h3 className="text-2xl font-bold ">Moves</h3>
              <span className='text-gray-600'>Moves learned by leveling up</span>
            </div>

            {loadingMoves && <LoadingSpinner />}
            {!loadingMoves && movesError && (
              <div className="text-red-500">{movesError.message}</div>
            )}
            {!loadingMoves && !movesError && moveDetails && (
              <DataTable
                headers={[
                  "Lv.",
                  "Move",
                  "Type",
                  "Power",
                  "Acc"
                ]}
                rows={[
                  ...renderMoveTableRows(moveDetails ?? [])
                ]}
              />
            )}


          </div>

        </div>


        {evolutionChainLoading && <LoadingSpinner />}
        {!evolutionChainLoading && evolutionChainError && (
          <div className="text-red-500">{evolutionChainError.message}</div>
        )}
        {!evolutionChainLoading && !evolutionChainError && evolutionChain && (
          <EvolutionChain evolutionChain={evolutionChain} />
        )}
      </Wrapper>
    );
  }

  if (pokemonDetailsError) {
    return <ErrorPage errorMsg={pokemonDetailsError.message} />;
  }
}

