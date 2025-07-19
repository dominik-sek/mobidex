interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasNext?: boolean;
}

export const Pagination = (props: PaginationProps) => {
  const hasPreviousPage = props.currentPage > 1;
  console.log(props.hasNext)
  return (
    <div className='flex items-center justify-center h-12 bg-white list-none'>
      <button onClick={() => props.onPageChange(props.currentPage - 1)} disabled={!hasPreviousPage} className='px-4 py-2 bg-gray-200 rounded-l'>
        prev
      </button>
      <ul className='flex items-center'>

        
      </ul>
      <button onClick={() => props.onPageChange(props.currentPage + 1)} className='px-4 py-2 rounded-r'>
        next
      </button>
  </div>
  );
}
