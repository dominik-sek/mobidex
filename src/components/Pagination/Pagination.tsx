import { PreviousIcon } from '../../icons/PreviousIcon';
import { NextIcon } from '../../icons/NextIcon';
import { PageNumber } from './page-number';


interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasNext?: boolean;
  pageCount?: number;
}

export const Pagination = (props: PaginationProps) => {
  console.log(props.pageCount)
  
  return (
    <nav className="flex items-center gap-x-1 px-2" aria-label="Pagination">

      <button
        onClick={() => props.onPageChange(props.currentPage - 1)}
        disabled={props.currentPage == 1}
        type="button"
        className=" min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous">
          <PreviousIcon />
      </button>

      <div className="flex items-center gap-x-1">
        {
          Array.from({ length: 5 }, (_, index) => {
            if (props.pageCount === 0) return null;
            const page = props.currentPage + index - 2; 
            if (page < 1 || (props.pageCount && page > props.pageCount)) {
              return null; 
            }
            return (
              <PageNumber isActive={props.currentPage === page} key={page} page={page} onClick={
                (page) => props.onPageChange(page)
              } />
            );
          })
        }

      </div>



      <button type="button"
        onClick={() => props.onPageChange(props.currentPage + 1)}
        disabled={!props.hasNext}
        className=" min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
          <NextIcon />
      </button>

    </nav>
  )
}
