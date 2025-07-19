interface BlockquoteProps {
  children?: React.ReactNode;
}
export const Blockquote = (props: BlockquoteProps) => {
  return (
    <div className='relative before:content[""] before:absolute before:h-full before:w-2 before:bg-blue-500 before:left-0 before:top-0 p-4 bg-slate-400/30 rounded-md shadow-md backdrop-blur-2xl'>
      <p className='text-gray-800 text-lg italic'>{props.children}</p>
    </div>
  )
}
