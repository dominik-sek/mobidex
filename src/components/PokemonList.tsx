import { useState } from "react";
import { Searchbar } from "./Searchbar.tsx";
import { Card } from "./Card.tsx";
import { Pagination } from './Pagination/Pagination.tsx';
import { fetchAllPokemon } from '../api/index.ts';
import type { Result } from '../types/pokemon.ts';
import { useFetch } from '../hooks/useFetch.ts';
import { LoadingScreen } from './LoadingScreen.tsx';
import { ErrorPage } from './ErrorPage.tsx';

export const PokemonList = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [maxResults, setMaxResults] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [fileteredPokemon, setFilteredPokemon] = useState<Result[]>([]);
    const [startedTyping, setStartedTyping] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!pokemonList) return;
        
        if (event.target.value === "") {
            setStartedTyping(false);
            setSearchQuery("");
            setCurrentPage(1);
            setFilteredPokemon([]);
            return;
        }
        setStartedTyping(true);

        setSearchQuery(event.target.value.toLowerCase());
        setFilteredPokemon(
            pokemonList?.results?.filter((pokemon: { name: string; }) => pokemon.name.toLowerCase().includes(searchQuery))
        );
        setCurrentPage(1);

        console.log(fileteredPokemon);
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleMaxResultsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMaxResults(Number(event.target.value));
        setCurrentPage(1);
    };

    const hasNextPage = () => {
        if(!pokemonList) return false
        return (currentPage * maxResults) < (startedTyping ? fileteredPokemon.length : pokemonList.results.length);
    };

    const {
        data: pokemonList,
        error: pokemonDataError,
        loading: pokemonDataLoading
    } = useFetch(() => fetchAllPokemon());


    if (pokemonDataError) {
        return <ErrorPage errorMsg={pokemonDataError.message} />;
    }
    if (pokemonDataLoading) {
        return <LoadingScreen />;
    }
    if (pokemonList) {
        const totalResults = startedTyping ? fileteredPokemon.length : pokemonList.results.length;
        const startIdx = totalResults === 0 ? 0 : (currentPage - 1) * maxResults + 1;
        const endIdx = Math.min(currentPage * maxResults, totalResults);
        const pageCount = Math.ceil(totalResults / maxResults);
        const remainingPages = Math.max(pageCount - currentPage, 0);
        return (
            <div className="flex flex-col gap-2 overflow-hidden h-full  ">
                <div className="flex flex-col md:flex-row items-center justify-between shrink-0 px-2 pt-2">
                    <Searchbar onChange={handleSearchChange} />
                    <div className="flex items-center gap-2">
                        <label htmlFor="max-results-select" className="text-gray-600 text-sm">Results per page:</label>
                        <select
                            id="max-results-select"
                            value={maxResults}
                            onChange={handleMaxResultsChange}
                            className="rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
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
                                    <Card key={pokemon.url.split('/')[6]} pokemon={{ name: pokemon.name, id: pokemon.url.split('/')[6] }} />
                                ))

                    }
                </div>

                <div className='h-24 shrink-0 flex flex-col items-center justify-center w-full '>
                    <span className='text-gray-500 mb-1'>
                        {totalResults === 0
                            ? 'No results'
                            : `Showing ${startIdx}-${endIdx} of ${totalResults} results (${remainingPages} page${remainingPages === 1 ? '' : 's'} left)`}
                    </span>
                    <Pagination
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        hasNext={hasNextPage()}
                        pageCount={pageCount}
                    />

                </div>
            </div>
        );
    }

};
