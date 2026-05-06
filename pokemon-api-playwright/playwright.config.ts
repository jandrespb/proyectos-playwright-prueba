import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',

  timeout: 30000,

  use: {
    baseURL: 'https://pokeapi.co/api/v2',
  },

  reporter: [['list']]
});