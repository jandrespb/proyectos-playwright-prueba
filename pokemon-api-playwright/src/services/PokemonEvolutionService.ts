import { BaseApi } from '../api/BaseApi';
import { Pokemon } from '../models/Pokemon';
import { Species } from '../models/Species';
import { Evolution } from '../models/Evolution';
import { ToolsUtils } from '../utils/ToolsUtils';

export class PokemonEvolutionService {

    private api: BaseApi;

    constructor() {

        this.api = new BaseApi();

    }

    async getPokemonEvolution(
        pokemonName: string = 'squirtle'
    ): Promise<Pokemon> {

        await this.api.init();
        const response = await this.api.getPokemon(pokemonName);

        if (response.status() !== 200) {
            throw new Error(`Error getting pokemon: ${pokemonName}`);
        }

        const pokemon: Pokemon = await response.json();

        // Extraer el ID de la especie del Pokémon utilizando la URL de la especie
        const speciesId = ToolsUtils.extractValue(pokemon.species.url);
        const speciesResponse = await this.api.getPokemonSpecies(speciesId);

        if (speciesResponse.status() !== 200) {
            throw new Error(`Error getting species: ${speciesId}`);
        }

        // Obtener la cadena de evolución del Pokémon utilizando el ID de la especie
        const species: Species = await speciesResponse.json();
        // console.log(species.evolution_chain.url);


        // Consumir la cadena de evolución utilizando el ID de la cadena de evolución
        const evolutionId = ToolsUtils.extractValue(species.evolution_chain.url);
        const evolutionResponse = await this.api.getEvolutionChain(evolutionId);

        if (evolutionResponse.status() !== 200) {
            throw new Error(`Error getting evolution chain: ${evolutionId}`);
        }
        const evolution: Evolution = await evolutionResponse.json();
        // console.log(evolution.chain);


        // LLamadada recursiva para extraer los nombres de las evoluciones
        const evolutionNames = this.extractEvolutionNames(evolution.chain);
        console.log(evolutionNames);

        // Obtener el peso de cada Pokémon en la cadena de evolución
        const pokemonsWithWeight = await this.getPokemonsWithWeight(evolutionNames);
        console.log(pokemonsWithWeight);

        // Ordenar los Pokémon alfabéticamente por su nombre
        const sortedPokemons = ToolsUtils.sortAlphabetically(pokemonsWithWeight);
        console.log(sortedPokemons);

        // Opcional: Guardar el resultado en un archivo JSON
        ToolsUtils.saveEvolutionLog(sortedPokemons);


        return pokemon;

    }

    private extractEvolutionNames(
        node: any,
        evolutions: string[] = []
    ): string[] {

        evolutions.push(node.species.name);

        for (const evolution of node.evolves_to) {
            this.extractEvolutionNames(evolution, evolutions);
        }

        return evolutions;
    }

    private async getPokemonsWithWeight(
        evolutionNames: string[]
    ): Promise<{ name: string; weight: number }[]> {

        const pokemons = [];

        for (const name of evolutionNames) {

            const response = await this.api.getPokemon(name);

            if (response.status() !== 200) {
                throw new Error(`Error getting pokemon: ${name}`);
            }

            const pokemon: Pokemon = await response.json();

            pokemons.push({
                name: pokemon.name,
                weight: pokemon.weight
            });

        }

        return pokemons;

    }

}
