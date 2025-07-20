export const PageNumber = (props: {
	page: number;
	onClick: (page: number) => void;
	isActive: boolean;
}) => {
	const handleClick = () => {
		props.onClick(props.page);
	};
	const activeClass = props.isActive ? 'bg-slate-500 text-white' : '';
	return (
		<button
			type="button"
			onClick={handleClick}
			className={`min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-lg rounded-lg focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none ${activeClass}`}
			aria-current="page">
			{props.page}
		</button>
	);
};
