import { Arrow } from '../../icons/Arrow';
import type { Chain } from '../../types/pokemon-evolution-chain';
import { Card } from '../Card';
interface NodeProps {
	chain: Chain;
}
export const EvolutionNode = (props: NodeProps) => {
	const { chain } = props;
	const id = chain.species.url.split('/').slice(-2)[0];
	const hasNextEvolution = chain.evolves_to && chain.evolves_to.length > 0;
	const name = chain.species.name;

	return (
		<div className="flex flex-col md:flex-row items-center">
			<Card pokemon={{ name, id }} />
			{hasNextEvolution && (
				<div className="flex flex-col md:flex-row items-center">
					<Arrow
						className="rotate-180 md:rotate-90"
						width="36"
						height="36"
					/>
					<div className="flex flex-col md:flex-row items-center">
						{chain.evolves_to.map((child: any) => (
							<EvolutionNode
								key={child.species.name}
								chain={child}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
