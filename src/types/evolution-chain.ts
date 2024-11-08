interface Species {
  name: string;
  url: string;
}

interface EvolutionData {
  species: Species;
  evolves_to: EvolutionChain[];
}

export interface EvolutionChain {
  chain?: EvolutionData;
}
