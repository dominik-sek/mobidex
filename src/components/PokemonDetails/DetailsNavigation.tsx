import type React from 'react';

interface DetailsNavigationProps {
  neighbours?: {
    prev: React.ReactNode;
    next: React.ReactNode;
  };
}
export const DetailsNavigation = (props: DetailsNavigationProps) => {
  return (
    <div className='flex justify-between'>
      {
        props.neighbours?.prev && (
          <button>
            Previous
            <div className="capitalize text-gray-500 text-sm">{props.neighbours?.prev}</div>
          </button>
        )
      }
      {
        props.neighbours?.next && (
          <button>
            Next
            <div className="capitalize text-gray-500 text-sm">{props.neighbours?.next || 0}</div>
          </button>
        )
      }

    </div>
  );
};
