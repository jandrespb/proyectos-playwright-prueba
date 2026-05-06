export interface Species {
  url: string;
}

export interface Pokemon {
  name: string;
  weight: number;
  species: Species;
}