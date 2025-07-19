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
const BarToWidth = (value: number, maxValue: number) => {
  const percentage = (value / maxValue) * 100;
  return `${percentage}%`;
}

export const StatsTable = (props: StatsTableProps) => {
 
 
  return (
    <div
      className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 rounded-xl bg-clip-border">
      <table className="w-full text-left table-auto min-w-max ">

        <tbody>
          {
            props.data.map((valueSet) => {
              return (
                <tr className="hover:bg-slate-50 even:bg-slate-100">
                  <th className='w-fit'>{valueSet.name}</th>
                  <td>
                    <div className={`relative capitalize text-white w-fit min-w-24 inline-flex  items-center rounded-md  text-md font-medium ring-1 ring-slate-800/10 ring-inset`}>
                      <span className={`w-full h-2 rounded-md ${BarToColor(valueSet.value, valueSet.minMaxValues.max)}`} style={{width:BarToWidth(valueSet.value, valueSet.minMaxValues.min) }} ></span>
                      </div>
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
          <tr>
            <th>
              Total
            </th>
            <th></th>
            <th>Base</th>
            <th>Min</th>
            <th>Max</th>
          </tr>
        </tbody>

      </table>
    </div>
  );
};
