interface DataTableProps {
  headers?: string[];
  rows?: (string | number | React.ReactNode )[][]
  className?: string;
}
export const DataTable = (props: DataTableProps) => {
  return (
    <table className={`table-auto w-full overflow-x-scroll  ${props.className || ''}`}>
      <thead className=''>
        <tr>
        {props.headers?.map((header, i) => {
          return (
              <th key={i} className=" px-2 py-1 text-left border-slate-200">{header}</th>
          )
        })}
        </tr>
      </thead>
      <tbody>
        {
          props.rows?.map((row, i) => (
            <tr key={i} className='border-b first-of-type:border-t capitalize border-slate-400'>
              {row.map((cell, j) => (
                <td key={j} className="px-2 py-1">{cell}</td>
              ))}  
            </tr>
            ))
        }
      </tbody>
    </table>
  )
}
