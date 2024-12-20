import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js";

export type CLICommand = {
	name: string,
	description: string,
	callback: (state: State) => void;
};

export type State = {
	repl: Interface,
	commands: Record<string, CLICommand>
}


export function initState(): State {
	const repl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > "
	})

	const commands = getCommands()

	return { repl: repl, commands: commands }
}
