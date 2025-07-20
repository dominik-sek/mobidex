import { typeToColorMapper } from '../../helpers/type-to-color-mapper';
import type { PokemonDetails } from '../../types/pokemon-details';
import type { PokemonSpecies } from '../../types/pokemon-species';
import { Badge } from '../Badge';

interface DetailsHeaderProps {
	details: { details: PokemonDetails; species: PokemonSpecies };
}
export const DetailsHeader = (props: DetailsHeaderProps) => {
	return (
		<div>
			<h2 className="text-gray-600 text-md">
				#{props.details?.details.id.toString().padStart(4, '0')}
			</h2>
			<h2 className="capitalize text-3xl font-bold">
				{props.details?.details.name}
			</h2>
			<p className="text-md  text-gray-600">
				{
					props.details?.species.genera.find(
						(genus) => genus.language.name === 'en',
					)?.genus
				}
			</p>
			<div className="flex items-center justify-center gap-2 flex-wrap">
				{props.details?.details.types.map((type) => (
					<Badge className={`${typeToColorMapper[type.type.name]}`}>
						{type.type.name}
					</Badge>
				))}
			</div>
		</div>
	);
};
