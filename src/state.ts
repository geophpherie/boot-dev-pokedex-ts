import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { URL } from "url";

export type CLICommand = {
	name: string,
	description: string,
	callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
	repl: Interface,
	commands: Record<string, CLICommand>,
	pokeapi: PokeAPI,
	pokedex: Map<string, Pokemon>
	nextLocationsURL?: URL,
	prevLocationsURL?: URL

}

export function initState(): State {
	const repl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > "
	})

	const commands = getCommands()

	const pokeapi = new PokeAPI(5000)

	return { repl: repl, commands: commands, pokeapi: pokeapi, pokedex: new Map() }
}
