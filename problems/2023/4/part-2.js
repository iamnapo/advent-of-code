import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const cardInstances = [];

for await (const line of lines) {
	const [card, numbers] = line.split(":");
	const cardId = Number(card.split(" ").filter(Boolean)[1]) - 1;
	const winningNumbers = new Set(numbers.split("|")[0].split(" ").filter(Boolean).map(Number));
	const ourNumbers = numbers.split("|")[1].split(" ").filter(Boolean).map(Number);
	const points = ourNumbers.filter((n) => winningNumbers.has(n)).length;
	cardInstances[cardId] = (cardInstances[cardId] || 0) + 1;
	for (let i = 1; i <= points; i++) {
		cardInstances[cardId + i] = (cardInstances[cardId + i] || 0) + (cardInstances[cardId] || 1);
	}
}

console.log(`Day 4 - Part 2 solution is: ${cardInstances.reduce((a, b) => a + b, 0)}`);
