interface ISpecies {
  name: string;
  url: string;
}

interface IEvolutionData {
  species: ISpecies;
  evolves_to: IEvolutionChain[];
}

export interface IEvolutionChain {
  chain?: IEvolutionData;
}
