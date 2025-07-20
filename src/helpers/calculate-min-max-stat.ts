import type { Stat } from '../types/pokemon-details';

/*
    max-EV = 31 stat points
    max-IV = 63 stat points
    beneficial nature = +10%
    negative nature = -10%

    non-HP base stat min-max can be calculated from:
    min: (2 * stat_value+ 5 (static for non-HP stats) ) * negative nature
    max: (2 * stat_value + max-EV + max-IV + 5) * beneficial nature

    HP min-max:
    min: 2 * hp_value + 110 (static for HP)
    max: 2 * hp_value + 110 + max-EV + max-IV
*/
export const calculateMinMaxStatValueAt100 = (
	statName: string,
	pokemonStats: Stat[],
): { min: number; max: number } => {
	let maxEV = 63; // max EV for a stat
	let maxIV = 31; // max IV for a stat

	const baseStat =
		pokemonStats.find((stat) => stat.stat.name === statName)?.base_stat ||
		0;

	if (statName === 'hp') {
		return {
			min: 2 * baseStat + 110,
			max: 2 * baseStat + 110 + maxEV + maxIV,
		};
	} else {
		return {
			min: Math.floor((2 * baseStat + 5) * 0.9),
			max: Math.floor((2 * baseStat + maxEV + maxIV + 5) * 1.1),
		};
	}
};
