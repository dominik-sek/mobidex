interface ArrowProps {
  height?: string;
  width?: string
  className?: string;
}
export const Arrow = (props: ArrowProps) => {
  const { height, width, className } = props;

  return (
  <span className="text-gray-500 my-2 mx-2">
      <svg
        className={className}
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" /></svg>
  </span>)
};
