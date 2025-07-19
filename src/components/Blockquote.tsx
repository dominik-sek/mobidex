interface BlockquoteProps {
  children?: React.ReactNode;
  color?: string;
}
export const Blockquote = (props: BlockquoteProps) => {
  return (
    <div style={{ backgroundColor: props.color}} className={` text-center p-4 `}>
      <p className='text-gray-500 text-xl '>{props.children}</p>
    </div>
  )
}
