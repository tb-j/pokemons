export interface Pokemon {
  id: number;
  name: string;
  url: string;
}

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

