export function cleanInput(input: string): string[] {
	const words = input.trim().split(" ").filter((word) => word != "")

	words.forEach((word) => { word.trim() })

	return words
}
