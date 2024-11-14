export interface SpeciesType {
  name: string;
  url: string;
}

export interface EvolutionDataType {
  species: SpeciesType;
  evolves_to?: EvolutionChainType[];
}

export interface EvolutionChainType {
  chain?: EvolutionDataType;
}
