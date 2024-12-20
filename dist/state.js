import { createInterface } from "readline";
import { getCommands } from "./command.js";
export function initState() {
    const repl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const commands = getCommands();
    return { repl: repl, commands: commands };
}
