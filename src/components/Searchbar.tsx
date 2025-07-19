interface SeachbarProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Searchbar = (props: SeachbarProps) => {


    return (
        <div className="flex items-center p-2 border">
            <label htmlFor='pokemon-search-input' className='w-auto ml-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=""
                     viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </label>

            <div className="h-6 border-l border-slate-200 mx-2"></div>

            <input onChange={props.onChange} className="h-10 w-full md:w-2/3" id="pokemon-search-input" type="search" defaultValue="" placeholder="Search for pokemon..."  />

        </div>

    )
}
