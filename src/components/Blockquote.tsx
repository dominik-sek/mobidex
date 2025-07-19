interface BlockquoteProps {
  children?: React.ReactNode;
  color?: string;
}
export const Blockquote = (props: BlockquoteProps) => {
  return (
    <div style={{ backgroundColor: props.color}} className={` p-4 rounded-md shadow-md backdrop-blur-2xl`}>
      <p className='text-gray-600 text-xl '>{props.children}</p>
    </div>
  )
}
