export interface Move {
	accuracy: number;
	contest_combos: null;
	contest_effect: ContestEffect;
	contest_type: ContestType;
	damage_class: ContestType;
	effect_chance: null;
	effect_changes: any[];
	effect_entries: EffectEntry[];
	flavor_text_entries: FlavorTextEntry[];
	generation: ContestType;
	id: number;
	learned_by_pokemon: ContestType[];
	machines: Machine[];
	meta: Meta;
	name: string;
	names: Name[];
	past_values: PastValue[];
	power: number;
	pp: number;
	priority: number;
	stat_changes: any[];
	super_contest_effect: ContestEffect;
	target: ContestType;
	type: ContestType;
}

export interface ContestEffect {
	url: string;
}

export interface ContestType {
	name: string;
	url: string;
}

export interface EffectEntry {
	effect: string;
	language: ContestType;
	short_effect: string;
}

export interface FlavorTextEntry {
	flavor_text: string;
	language: ContestType;
	version_group: ContestType;
}

export interface Machine {
	machine: ContestEffect;
	version_group: ContestType;
}

export interface Meta {
	ailment: ContestType;
	ailment_chance: number;
	category: ContestType;
	crit_rate: number;
	drain: number;
	flinch_chance: number;
	healing: number;
	max_hits: null;
	max_turns: null;
	min_hits: null;
	min_turns: null;
	stat_chance: number;
}

export interface Name {
	language: ContestType;
	name: string;
}

export interface PastValue {
	accuracy: number;
	effect_chance: null;
	effect_entries: any[];
	power: null;
	pp: null;
	type: null;
	version_group: ContestType;
}

export interface LevelUpMove {
	name: string;
	fromLevel: number;
	versionName: string;
	url: string;
}

export type LevelUpMoveWithDetails = LevelUpMove & Move;
