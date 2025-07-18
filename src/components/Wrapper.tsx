import * as React from "react";

interface WrapperProps {
    children?: React.ReactNode
}

export const Wrapper = (props: WrapperProps) =>{
    return (
        <div className="bg-slate-600 slate  text-slate-300 w-screen h-screen flex flex-col items-center justify-center font-poppins p-6 gap-2">
            {props.children}
        </div>
    )
}