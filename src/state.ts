import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js";
import { PokeAPI } from "./pokeapi.js";
import { URL } from "url";

export type CLICommand = {
	name: string,
	description: string,
	callback: (state: State) => Promise<void>;
};

export type State = {
	repl: Interface,
	commands: Record<string, CLICommand>,
	pokeapi: PokeAPI,
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

	const pokeapi = new PokeAPI()

	return { repl: repl, commands: commands, pokeapi: pokeapi }
}
