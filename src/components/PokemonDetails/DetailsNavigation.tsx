import { Link } from 'react-router';
import type { PokemonDetailsNavigationState } from '../../types/pokemon';

export const DetailsNavigation = (props: PokemonDetailsNavigationState) => {
	return (
		<div className="flex justify-between">
			{props.previous && (
				<Link to={`/pokemon/${props.previous.id}`}>
					<button>
						<span className="text-lg">Previous</span>
						<div className="capitalize text-gray-500 text-md">
							{props.previous.name}
						</div>
						<span className="capitalize text-gray-500 text-sm">
							#{props.previous.id}
						</span>
					</button>
				</Link>
			)}
			{props.next && (
				<Link to={`/pokemon/${props.next.id}`}>
					<button>
						<span className="text-lg">Next</span>
						<div className="capitalize text-gray-500 text-md">
							{props.next.name}
						</div>
						<span className="capitalize text-gray-500 text-sm">
							#{props.next.id}
						</span>
					</button>
				</Link>
			)}
		</div>
	);
};
