import * as React from 'react';
import { Link } from 'react-router';

interface WrapperProps {
	children?: React.ReactNode;
	className?: string;
}

export const Wrapper = (props: WrapperProps) => {
	return (
		<div
			className={`bg-slate-300 mx-auto my-0 max-w-7xl flex flex-col font-poppins px-6 py-6 gap-2 h-screen ${props.className || ''}`}>
			<nav>
				<div className="flex justify-between items-center mb-4">
					<Link to={`/`}>
						<h2 className="text-2xl font-bold">Mobidex</h2>
					</Link>
				</div>
			</nav>
			{props.children}
		</div>
	);
};
