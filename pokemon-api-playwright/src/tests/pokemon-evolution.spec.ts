import { test, expect } from '@playwright/test';

import { PokemonEvolutionService } from '../services/PokemonEvolutionService';

test('should get squirtle pokemon with status 200', async () => {

  const service = new PokemonEvolutionService();

  const pokemon = await service.getPokemonEvolution();

  expect(pokemon.name).toBe('squirtle');

});
