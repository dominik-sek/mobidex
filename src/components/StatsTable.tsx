interface StatsTableProps {
  data: {
    name: string;
    value: number;
    minMaxValues: {
      min: number;
      max: number;
    }
  }[];
}

const BarToColor = (value: number, maxValue: number) => {
  const percentage = value / maxValue;
  if (percentage < 0.2) return 'bg-red-500';
  if (percentage < 0.4) return 'bg-orange-500';
  if (percentage < 0.6) return 'bg-yellow-500';
  if (percentage < 0.8) return 'bg-green-500';
  return 'bg-blue-500';
}

export const StatsTable = (props: StatsTableProps) => {
 
 
  return (
    <div
      className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 rounded-xl bg-clip-border">
      <table className="w-full text-left table-auto min-w-max">

        <tbody>
          {
            props.data.map((valueSet) => {
              return (
                <tr className="hover:bg-slate-50">
                  <th className='w-fit'>{valueSet.name}</th>
                  <td>
                    <span
                      className={`capitalize text-white w-fit min-w-24 inline-flex justify-center items-center rounded-md px-2 py-1 text-md font-medium ring-1 ring-slate-800/10 ring-inset ${BarToColor(valueSet.value, valueSet.maxValue)}`} />
                  </td>
                  <td>
                    <p className="block text-sm text-slate-800">
                      {valueSet.value}
                    </p>
                  </td>
                  <td>
                    {valueSet.minMaxValues.min}
                  </td>
                  <td>
                    {valueSet.minMaxValues.max}
                  </td>
                </tr>
              );
            })
          }
        </tbody>

      </table>
    </div>
  );
};
