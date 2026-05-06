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
        
        // 1. Obtener datos base del Pokémon
        const pokemon = await this.getPokemonData(pokemonName);

        // 2. Obtener la especie para llegar a la cadena de evolución
        const species = await this.fetchSpeciesFromPokemon(pokemon);

        // 3. Obtener la cadena de evolución completa
        const evolution = await this.fetchEvolutionChain(species);

        // 4. Procesar nombres y pesos
        const evolutionNames = this.extractEvolutionNames(evolution.chain);
        const pokemonsWithWeight = await this.getPokemonsWithWeight(evolutionNames);

        // 5. Ordenar y Guardar
        const sortedPokemons = ToolsUtils.sortAlphabetically(pokemonsWithWeight);
        console.log(sortedPokemons);

        // Opcional: Guardar en un log o base de datos
        ToolsUtils.saveEvolutionLog(sortedPokemons);


        return pokemon;
    }

    /**
     * Métodos de Orquestación Interna
     */

    private async fetchSpeciesFromPokemon(pokemon: Pokemon): Promise<Species> {
        const speciesId = ToolsUtils.extractValue(pokemon.species.url);
        return await this.getSpeciesData(speciesId);
    }

    private async fetchEvolutionChain(species: Species): Promise<Evolution> {
        const evolutionId = ToolsUtils.extractValue(species.evolution_chain.url);
        const response = await this.api.getEvolutionChain(evolutionId);

        if (response.status() !== 200) {
            throw new Error(`Error getting evolution chain: ${evolutionId}`);
        }
        
        return await response.json();
    }

    /**
     * Métodos de Datos y Utilidad
     */

    private async getPokemonData(pokemonName: string): Promise<Pokemon> {
        const response = await this.api.getPokemon(pokemonName);

        if (response.status() !== 200) {
            throw new Error(`Error getting pokemon: ${pokemonName}`);
        }

        return await response.json();
    }

    private async getSpeciesData(speciesId: string): Promise<Species> {
        const response = await this.api.getPokemonSpecies(speciesId);

        if (response.status() !== 200) {
            throw new Error(`Error getting species: ${speciesId}`);
        }

        return await response.json();
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