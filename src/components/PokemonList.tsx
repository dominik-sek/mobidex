import {useEffect, useState} from "react";
import {Searchbar} from "./Searchbar.tsx";
import {Card} from "./Card.tsx";
import { Pagination } from './Pagination/Pagination.tsx';
import { fetchAllPokemon } from '../api/index.ts';
import type { Pokemon, Result } from '../types/pokemon.ts';

interface PokemonListProps {
    //todo
}


export const PokemonList = (props: PokemonListProps) =>{
    const [pokemonList, setPokemonList] = useState<Pokemon>({
        count: 0,
        next: "null",
        previous: null,
        results: []
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [maxResults, setMaxResults] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [fileteredPokemon, setFilteredPokemon] = useState<Result[]>([]);
    const [startedTyping, setStartedTyping] = useState(false);


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        //handle case with empty search query
        if (event.target.value === "") {
            setStartedTyping(false);
            setSearchQuery("");
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
        <div className="flex flex-col justify-around w-full h-full gap-2">
            <div className='min-h-12'>
                <Searchbar onChange={handleSearchChange} />
            </div>

            <div className="h-fit grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 overflow-y-auto p-2 gap-2">
                {
                    (startedTyping ? fileteredPokemon : pokemonList.results)?.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 divide-y-0">
                            No Pokemon found for "{searchQuery}"
                        </div>
                    ) :
                        (
                            startedTyping ? fileteredPokemon : pokemonList.results)?.slice((currentPage - 1) * maxResults, currentPage * maxResults).map((pokemon, index: number) => (
                        <Card key={pokemon.url.split('/')[6]} pokemon={{name: pokemon.name, id: pokemon.url.split('/')[6]}} />
                    ))
                    
                }
            </div>

            <div className='min-h-12 flex items-center justify-center w-full '>
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
