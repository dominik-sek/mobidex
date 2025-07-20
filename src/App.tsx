import { Wrapper } from './components/Wrapper.tsx';
import { PokemonList } from './components/PokemonList.tsx';

function App() {
	return (
		<div className="bg-slate-300">
			<Wrapper>
				<PokemonList />
			</Wrapper>
		</div>
	);
}

export default App;
