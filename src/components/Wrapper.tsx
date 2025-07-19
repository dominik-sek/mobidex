import * as React from "react";
import { Searchbar } from './Searchbar';

interface WrapperProps {
    children?: React.ReactNode
    className?: string;
}

export const Wrapper = (props: WrapperProps) =>{
    return (
        <div className={`bg-slate-300 mx-auto my-auto max-w-7xl min-h-screen flex flex-col font-poppins px-6 py-6 gap-2 ` + props.className} >
            <nav>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Pokédex</h1>
                    <div className="flex items-center gap-4">
                        menu
                    </div>
                </div>
            </nav>
            {props.children}
        </div>
    )
}
