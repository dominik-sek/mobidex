import type { PokemonEvolutionChain } from '../../types/pokemon-evolution-chain';
import { EvolutionNode } from './EvolutionNode';

export default function EvolutionChain({
	evolutionChain,
}: {
	evolutionChain: PokemonEvolutionChain;
}) {
	if (!evolutionChain?.chain)
		return <div className="text-gray-700">No evolutions</div>;

	return (
		<div>
			<h3 className="text-2xl font-bold mb-4">Evolution Chain</h3>
			<div className="flex justify-center">
				<EvolutionNode chain={evolutionChain.chain} />
			</div>
		</div>
	);
}
