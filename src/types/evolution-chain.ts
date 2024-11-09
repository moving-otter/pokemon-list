interface Species {
  name: string;
  url: string;
}

interface EvolutionData {
  species: Species;
  evolves_to: EvolutionChainType[];
}

export interface EvolutionChainType {
  chain?: EvolutionData;
}
