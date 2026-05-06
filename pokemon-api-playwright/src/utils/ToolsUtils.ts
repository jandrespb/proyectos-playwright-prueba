import * as fs from 'fs';

export class ToolsUtils {

    static extractValue(
        url: string,
        position: number = 2
    ): string {

        const parts = url.split('/');

        return parts[parts.length - position];

    }

    static sortAlphabetically(
        pokemons: { name: string; weight: number }[]
    ): { name: string; weight: number }[] {

        for (let i = 0; i < pokemons.length; i++) {

            for (let j = 0; j < pokemons.length - 1; j++) {
                if (
                    pokemons[j].name.localeCompare(
                        pokemons[j + 1].name
                    ) > 0
                ) {

                    const temp = pokemons[j];
                    pokemons[j] = pokemons[j + 1];
                    pokemons[j + 1] = temp;
                }
            }
        }

        return pokemons;

    }

    static saveEvolutionLog(
        pokemons: { name: string; weight: number }[]
    ): void {

        const path = 'src/logs/evolutions.json';

        const data = {
            pokemon: 'squirtle',
            evolutions: pokemons
        };

        fs.writeFileSync(
            path,
            JSON.stringify(data, null, 2)
        );

    }

}