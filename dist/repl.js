import { createInterface } from "readline";
export function cleanInput(input) {
    return input.trim().split(" ").filter((word) => word != "").map((word) => word.trim().toLowerCase());
}
export function startREPL() {
    const repl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    repl.prompt();
    repl.on("line", (input) => {
        const words = cleanInput(input);
        if (words.length == 0) {
            repl.prompt();
            return;
        }
        else {
            console.log(`Your command was: ${words[0]}`);
            repl.prompt();
        }
    });
}
