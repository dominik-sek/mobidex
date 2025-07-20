import {useEffect, useState} from "react";
import {Searchbar} from "./Searchbar.tsx";
import {Card} from "./Card.tsx";
import { Pagination } from './Pagination/Pagination.tsx';
import { fetchAllPokemon } from '../api/index.ts';
import type { Pokemon, Result } from '../types/pokemon.ts';

export const PokemonList = () =>{
    const [pokemonList, setPokemonList] = useState<Pokemon>({
        count: 0,
        next: "null",
        previous: null,
        results: []
    });
    const maxResults = 20
    const [searchQuery, setSearchQuery] = useState("");
    //const [maxResults, setMaxResults] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [fileteredPokemon, setFilteredPokemon] = useState<Result[]>([]);
    const [startedTyping, setStartedTyping] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(fileteredPokemon.length /maxResults)

        //handle case with empty search query
        if (event.target.value === "") {
            setStartedTyping(false);
            setSearchQuery("");
            setCurrentPage(1)
            setFilteredPokemon([]);
            return;
        }
        setStartedTyping(true);
        
        setSearchQuery(event.target.value.toLowerCase());
        setFilteredPokemon(
            pokemonList?.results?.filter((pokemon: { name: string; }) => pokemon.name.toLowerCase().includes(searchQuery))
        );
        setCurrentPage(1); // Reset to first page on new search
        
        console.log(fileteredPokemon);
    };
    
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    const hasNextPage = () => {
        return (currentPage * maxResults) < (startedTyping ? fileteredPokemon.length : pokemonList.results.length);
    };

    useEffect(() => {
        fetchAllPokemon().then((pokemonData) => {
            setPokemonList(pokemonData);
        })
        .catch(error => {
            console.error('Error fetching Pokémon:', error);
        });
        

    }, [])
    
    if (!pokemonList.results || pokemonList.results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif" alt="Loading..." className="w-24 h-24 " />
                Loading...
            </div>
        )
    }
    else {
        
    
    return(
        <div className="flex flex-col gap-2 overflow-hidden">
            <div className='shrink-0'>
                <Searchbar onChange={handleSearchChange} />
            </div>

            <div className="flex flex-1 flex-wrap justify-center overflow-y-auto p-2 gap-2">
                {
                    (startedTyping ? fileteredPokemon : pokemonList.results)?.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 divide-y-0">
                            No Pokemon found for "{searchQuery}"
                        </div>
                    ) :
                    (
                            startedTyping ? fileteredPokemon : pokemonList.results)?.slice((currentPage - 1) * maxResults, currentPage * maxResults).map((pokemon) => (
                        <Card key={pokemon.url.split('/')[6]} pokemon={{name: pokemon.name, id: pokemon.url.split('/')[6]}} />
                    ))
                    
                }
            </div>

            <div className='h-16 shrink-0 flex items-center justify-center w-full '>
                <Pagination
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    hasNext={hasNextPage()}
                    pageCount={Math.ceil((startedTyping ? fileteredPokemon : pokemonList?.results).length / maxResults)}
                />

            </div>
        </div>
    )
    }
}
