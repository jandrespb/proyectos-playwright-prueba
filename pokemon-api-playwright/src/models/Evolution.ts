export interface EvolutionSpecies {
  name: string;
}

export interface EvolutionNode {
  species: EvolutionSpecies;
  evolves_to: EvolutionNode[];
}

export interface Evolution {
  chain: EvolutionNode;
}