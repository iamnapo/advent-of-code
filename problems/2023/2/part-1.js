import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const maxNumberOfCubes = new Map([
	["red", 12],
	["green", 13],
	["blue", 14],
]);

let sumOfPossibleGameIds = 0;

for await (const line of lines) {
	const [id, value] = line.split(": ");
	const gameId = id.split(" ")[1];
	const gameRounds = value.split("; ");
	if (gameRounds.every((round) => {
		const redCubes = /(\d+) red/g.exec(round);
		const greenCubes = /(\d+) green/g.exec(round);
		const blueCubes = /(\d+) blue/g.exec(round);
		return (
			Number(redCubes?.[1] || 0) <= maxNumberOfCubes.get("red")
			&& Number(greenCubes?.[1] || 0) <= maxNumberOfCubes.get("green")
			&& Number(blueCubes?.[1] || 0) <= maxNumberOfCubes.get("blue")
		);
	})) {
		sumOfPossibleGameIds += Number(gameId);
	}
}

console.log(`Day 2 - Part 1 solution is ${sumOfPossibleGameIds}`);
