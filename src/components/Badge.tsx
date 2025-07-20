interface BadgeProps {
	className?: string;
	children?: React.ReactNode;
}
export const Badge = (props: BadgeProps) => {
	return (
		<span
			className={`capitalize text-white w-fit min-w-24 inline-flex justify-center items-center rounded-md px-2 py-1 text-md font-medium ring-1 ring-slate-800/10 ring-inset ${props.className} `}>
			{props.children}
		</span>
	);
};
