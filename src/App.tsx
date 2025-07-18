import {Wrapper} from "./components/Wrapper.tsx";
import {PokemonList} from "./components/PokemonList.tsx";

function App() {
    return (
        <Wrapper>
            <h2>Minidex</h2>
            <PokemonList /> 
            </Wrapper>
    )
}

export default App;
