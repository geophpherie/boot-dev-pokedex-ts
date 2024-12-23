import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { CLICommand } from "./state.js";


export function getCommands(): Record<string, CLICommand> {
	return {
		help: {
			name: "help",
			description: "Displays a help message",
			callback: commandHelp
		},
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit
		},
		map: {
			name: "map",
			description: "Explore the Pokemon world (forward)",
			callback: commandMap
		},
		mapb: {
			name: "mapb",
			description: "Explore the Pokemon world (backward)",
			callback: commandMapb
		},
		explore: {
			name: "explore",
			description: "Explore a location-area",
			callback: commandExplore
		},
	}
}
