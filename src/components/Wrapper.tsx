import * as React from "react";

interface WrapperProps {
    children?: React.ReactNode
}

export const Wrapper = (props: WrapperProps) =>{
    return (
        <div className="bg-slate-300 mx-auto my-auto max-w-7xl h-screen flex flex-col font-poppins px-6 py-6 gap-2">
            {props.children}
        </div>
    )
}
