import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const input = await readFile(new URL("input.txt", import.meta.url), "utf8");

const info = input.split("\n");
const time = Number(info[0].match(/\d+/g).reduce((a, b) => a + b, ""));
const distance = Number(info[1].match(/\d+/g).reduce((a, b) => a + b, ""));

let waysToWin = 0;
for (let chargeTime = 0; chargeTime < time; chargeTime++) {
	const travelledDistance = (time - chargeTime) * chargeTime;
	if (travelledDistance > distance) waysToWin += 1;
}

console.log(`Day 6 - Part 2 solution is: ${waysToWin}`);
