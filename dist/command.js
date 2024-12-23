import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap, commandMapb } from "./command_map.js";
export function getCommands() {
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
        catch: {
            name: "catch",
            description: "Catch a pokemon!",
            callback: commandCatch
        },
        inspect: {
            name: "inspect",
            description: "Inspect a pokemon!",
            callback: commandInspect
        },
    };
}
