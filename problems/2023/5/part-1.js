import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const input = await readFile(new URL("input.txt", import.meta.url), "utf8");

const info = input.split("\n\n");
const seeds = info[0].split(": ")[1].split(" ").map(Number);
const seedToSoilInfo = info[1].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));
const soilToFertilizerInfo = info[2].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));
const fertilizerToWaterInfo = info[3].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));
const waterToLightInfo = info[4].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));
const lightToTemperatureInfo = info[5].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));
const temperatureToHumidityInfo = info[6].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));
const humidityToLocationInfo = info[7].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));

let XtoYMap = new Map(seeds.map((s) => [s, s]));

for (const mapping of [
	seedToSoilInfo,
	soilToFertilizerInfo,
	fertilizerToWaterInfo,
	waterToLightInfo,
	lightToTemperatureInfo,
	temperatureToHumidityInfo,
	humidityToLocationInfo,
]) {
	for (const [destStart, sourceStart, length] of mapping) {
		for (const seed of XtoYMap.keys()) {
			if (seed >= sourceStart && seed < sourceStart + length) {
				XtoYMap.set(seed, destStart + (seed - sourceStart));
			}
		}
	}

	XtoYMap = new Map([...XtoYMap.values()].map((e) => [e, e]));
}

console.log(`Day 5 - Part 1 solution is: ${Math.min(...XtoYMap.keys())}`);
