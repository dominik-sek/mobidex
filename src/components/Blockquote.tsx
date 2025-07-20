interface BlockquoteProps {
  children?: React.ReactNode;
  color?: string;
}
export const Blockquote = (props: BlockquoteProps) => {
  return (
    <div style={{ backgroundColor: props.color}} className={`p-4 w-full flex items-center justify-center`}>
      <p className='text-gray-500 text-xl md:text-md text-center max-w-96'>{props.children}</p>
    </div>
  )
}
