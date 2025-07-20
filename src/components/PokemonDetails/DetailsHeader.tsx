import { typeToColorMapper } from '../../helpers/type-to-color-mapper';
import type { PokemonDetails } from '../../types/pokemon-details';
import type { PokemonSpecies } from '../../types/pokemon-species';

interface DetailsHeaderProps {
  details: { details: PokemonDetails, species: PokemonSpecies; };
}
export const DetailsHeader = (props: DetailsHeaderProps) => {
  return (
    <div>
      <h2 className='text-gray-600 text-md'>#{props.details?.details.id.toString().padStart(4, "0")}</h2>
      <h2 className="capitalize text-3xl font-bold">{props.details?.details.name}</h2>
      <p className="text-md  text-gray-600">
        {props.details?.species.genera.find(genus => genus.language.name === 'en')?.genus}
      </p>
      <div className='flex items-center justify-center gap-2 flex-wrap'>
        {
          props.details?.details.types.map((type) => (
            <span className={`capitalize text-white w-fit min-w-24 inline-flex justify-center items-center rounded-md px-2 py-1 text-md font-medium ring-1 ring-slate-800/10 ring-inset ${typeToColorMapper[type.type.name]}`} >
              {type.type.name}
            </span>

          ))
        }

      </div>
    </div>
  );
};
