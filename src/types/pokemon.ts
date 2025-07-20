export interface Pokemon {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];
}

export interface Result {
  name: string;
  url:  string;
}

export interface PokemonBaseInfo {
  name: string;
  id: string;
}

export interface PokemonDetailsNavigationState {
  previous?: PokemonBaseInfo | null;
  next?: PokemonBaseInfo | null;
}
