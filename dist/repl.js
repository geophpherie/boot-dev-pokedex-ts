export function cleanInput(input) {
    return input.trim().split(" ").filter((word) => word != "").map((word) => word.trim().toLowerCase());
}
export function startREPL(state) {
    state.repl.prompt();
    state.repl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length == 0) {
            state.repl.prompt();
            return;
        }
        else {
            const command = state.commands[words[0]];
            if (command === undefined) {
                console.log("Unknown command");
            }
            else {
                try {
                    await command.callback(state, ...words.slice(1));
                }
                catch (e) {
                    console.log(e);
                }
            }
            state.repl.prompt();
            return;
        }
    });
}
