import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

let sumOfGamePowerSets = 0;

for await (const line of lines) {
	const [, value] = line.split(": ");
	const gameRounds = value.split("; ");
	let maxNumberOfRedCubes = 0;
	let maxNumberOfGreenCubes = 0;
	let maxNumberOfBlueCubes = 0;
	for (const round of gameRounds) {
		const redCubes = /(\d+) red/g.exec(round);
		const greenCubes = /(\d+) green/g.exec(round);
		const blueCubes = /(\d+) blue/g.exec(round);
		maxNumberOfRedCubes = Math.max(maxNumberOfRedCubes, Number(redCubes?.[1] || 0));
		maxNumberOfGreenCubes = Math.max(maxNumberOfGreenCubes, Number(greenCubes?.[1] || 0));
		maxNumberOfBlueCubes = Math.max(maxNumberOfBlueCubes, Number(blueCubes?.[1] || 0));
	}

	sumOfGamePowerSets += maxNumberOfRedCubes * maxNumberOfGreenCubes * maxNumberOfBlueCubes;
}

console.log(`Day 2 - Part 2 solution is ${sumOfGamePowerSets}`);
