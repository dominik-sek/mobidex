import type { Ability } from '../types/ability';

  export const getAbilityDescription = (abilityName: string | undefined,  abilityDetails: Ability[]) => {
    if (!abilityName) return "";
    const match = abilityDetails.find((ability) => ability.name === abilityName);
    if (!match) return "";

    const englishDescription = match.effect_entries.find((entry) => entry.language.name === "en");

    return englishDescription?.short_effect || "";
  };
