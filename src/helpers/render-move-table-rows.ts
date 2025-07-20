import type { LevelUpMoveWithDetails } from '../types/move';

export const renderMoveTableRows = (moveDetails: LevelUpMoveWithDetails[]) => {
	return moveDetails.map((move) => {
		let englishName = move.names.find((move) => {
			return move.language.name === 'en';
		});
		return [
			move.fromLevel,
			englishName?.name,
			move.type.name,
			move.power,
			move.accuracy,
		];
	});
};
