wimport { useQuery } from "@tanstack/react-query";
import {
  fetchPokemonByNameOrNumber,
  fetchPokemonByType,
} from "../api/pokemonApi";
import { useSearchStore } from "../store/pokemonSearchStore";
import { z } from "zod";

const querySchema = z.string().nonempty();

export const usePokemonSearch = (query: string) => {
  const { setResults } = useSearchStore();

  // Query by name or number
  const { data: pokemonByNameOrNumber, isLoading: loadingNameOrNumber } =
    useQuery(
      ["pokemonSearch", query],
      async () => {
        if (querySchema.safeParse(query).success && isNaN(Number(query))) {
          return fetchPokemonByNameOrNumber(query);
        } else if (!isNaN(Number(query))) {
          return fetchPokemonByNameOrNumber(Number(query));
        }
        return null;
      },
      {
        enabled: !!query,
        onSuccess: (data) => {
          if (data) setResults([data]);
        },
      }
    );

  // Query by type
  const { data: pokemonByType, isLoading: loadingType } = useQuery(
    ["pokemonTypeSearch", query],
    () => fetchPokemonByType(query),
    {
      enabled: !!query && isNaN(Number(query)),
      onSuccess: (data) => setResults(data),
    }
  );

  return {
    results: pokemonByNameOrNumber || pokemonByType || [],
    isLoading: loadingNameOrNumber || loadingType,
  };
};
