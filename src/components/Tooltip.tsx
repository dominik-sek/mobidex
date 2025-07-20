import { useEffect, useRef, useState } from 'react';
import { Info } from '../icons/Info';

interface TooltipProps {
	name: string;
	description: string;
}

export const Tooltip = ({ name, description }: TooltipProps) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const toggleTooltip = () => {
		setOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		if (open) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [open]);

	return (
		<div
			ref={ref}
			className="inline-flex items-center space-x-1 relative group">
			<span className="font-bold ">{name}</span>

			<button
				type="button"
				onClick={toggleTooltip}
				className="text-gray-500 cursor-pointer focus:outline-none"
				aria-label={`More info about ${name}`}>
				<Info />
			</button>

			<div
				className={`
          absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2
          rounded-lg bg-black text-white text-sm p-2 shadow-lg z-10
          transition-opacity duration-200
          pointer-events-none opacity-0
          group-hover:opacity-100 group-hover:pointer-events-auto
          ${open ? 'opacity-100 pointer-events-auto' : ''}
        `}>
				{description || 'No description available.'}
			</div>
		</div>
	);
};
