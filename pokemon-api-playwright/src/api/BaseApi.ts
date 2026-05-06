import { request, APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApi {

  private apiContext!: APIRequestContext;

  private readonly BASE_URL = 'https://pokeapi.co/api/v2';

  async init(): Promise<void> {

    this.apiContext = await request.newContext();

  }

  async getPokemon(pokemonName: string): Promise<APIResponse> {

    return await this.apiContext.get(
      `${this.BASE_URL}/pokemon/${pokemonName}`
    );

  }

  async getPokemonSpecies(speciesName: string): Promise<APIResponse> {

    return await this.apiContext.get(
      `${this.BASE_URL}/pokemon-species/${speciesName}`
    );

  }

  async getEvolutionChain(evolutionId: string): Promise<APIResponse> {

    return await this.apiContext.get(
      `${this.BASE_URL}/evolution-chain/${evolutionId}`
    );

  }

}