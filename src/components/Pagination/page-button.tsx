interface PageButtonProps {
	onClick: () => void;
	children: React.ReactNode;
	disabled?: boolean;
	className?: string;
}
export const PageButton = (props: PageButtonProps) => {
	return (
		<button className="w-full h-10 px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
			{props.children}
		</button>
	);
};
