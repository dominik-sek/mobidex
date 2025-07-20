interface StatsTableProps {
	data: {
		name: string;
		value: number;
		minMaxValues: {
			min: number;
			max: number;
		};
	}[];
}

const BarToColor = (value: number, maxValue: number) => {
	const percentage = value / maxValue;
	if (percentage < 0.2) return 'bg-red-500';
	if (percentage < 0.4) return 'bg-orange-500';
	if (percentage < 0.6) return 'bg-yellow-500';
	if (percentage < 0.8) return 'bg-green-500';
	return 'bg-blue-500';
};
const BarToWidth = (value: number, maxValue: number) => {
	const percentage = (value / maxValue) * 100;
	return `${percentage}%`;
};

export const StatsTable = (props: StatsTableProps) => {
	return (
		<table className="w-full text-left table-auto min-w-max ">
			<tbody>
				{props.data.map((valueSet) => {
					return (
						<tr className="border-b first-of-type:border-t capitalize border-slate-400">
							<th className="px-2 py-1 text-left border-slate-200">
								{valueSet.name}
							</th>
							<td>
								<div
									className={`relative capitalize text-white border w-fit min-w-24 inline-flex  items-center rounded-md text-md font-medium `}>
									<span
										className={`w-full h-3 rounded-md ${BarToColor(valueSet.value, valueSet.minMaxValues.max)}`}
										style={{
											width: BarToWidth(
												valueSet.value,
												valueSet.minMaxValues.min,
											),
										}}></span>
								</div>
							</td>
							<td>
								<p className="block  text-slate-800">
									{valueSet.value}
								</p>
							</td>
							<td>{valueSet.minMaxValues.min}</td>
							<td>{valueSet.minMaxValues.max}</td>
						</tr>
					);
				})}
				<tr className="border-b first-of-type:border-t capitalize border-slate-400">
					<th className="px-2 py-1 text-left border-slate-200">
						Total
					</th>
					<th></th>
					<th className="px-2 py-1 text-left border-slate-200">
						Base
					</th>
					<th className="px-2 py-1 text-left border-slate-200">
						Min
					</th>
					<th className="px-2 py-1 text-left border-slate-200">
						Max
					</th>
				</tr>
			</tbody>
		</table>
	);
};
