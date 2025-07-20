interface DataTableProps {
  headers?: string[];
  rows?: (string | number | React.ReactNode)[][]
  className?: string;
}
export const DataTable = (props: DataTableProps) => {
  return (
    <table className={`table-auto w-full md:w-1/2 ${props.className || ''}`}>
      <thead>
        <tr>
        {props.headers?.map((header, i) => {
          return (
              <th key={i} className=" px-2 py-1 text-left">{header}</th>
          )
        })}
        </tr>
      </thead>
      <tbody>
        {
          props.rows?.map((row, i) => (
            <tr key={i} className='border-b'>
              {row.map((cell, j) => (
                <td key={j} className=" px-2 py-1">{cell}</td>
              ))}  
            </tr>
            ))
        }
      </tbody>
    </table>
  )
}
