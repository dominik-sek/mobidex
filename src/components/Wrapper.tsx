import * as React from "react";

interface WrapperProps {
    children?: React.ReactNode
}

export const Wrapper = (props: WrapperProps) =>{
    return (
        <div className="bg-slate-300 mx-auto max-w-6xl h-screen flex flex-col items-center justify-center font-poppins px-6 gap-2">
            {props.children}
        </div>
    )
}
