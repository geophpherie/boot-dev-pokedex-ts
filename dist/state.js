import { createInterface } from "readline";
import { getCommands } from "./command.js";
import { PokeAPI } from "./pokeapi.js";
export function initState() {
    const repl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const commands = getCommands();
    const pokeapi = new PokeAPI(5000);
    return { repl: repl, commands: commands, pokeapi: pokeapi, pokedex: new Map() };
}
