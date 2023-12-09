import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const input = await readFile(new URL("input.txt", import.meta.url), "utf8");

const info = input.split("\n\n");
const seedsInfo = info[0].split(": ")[1].split(" ").map(Number);
const seedToSoilInfo = info[1].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));
const soilToFertilizerInfo = info[2].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));
const fertilizerToWaterInfo = info[3].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));
const waterToLightInfo = info[4].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));
const lightToTemperatureInfo = info[5].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));
const temperatureToHumidityInfo = info[6].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));
const humidityToLocationInfo = info[7].split(":\n")[1].split("\n").map((line) => line.split(" ").map(Number));

let ranges = [];
for (let i = 0; i < seedsInfo.length; i += 2) {
	ranges.push({ start: seedsInfo[i], end: seedsInfo[i] + seedsInfo[i + 1] });
}

for (const mapping of [
	seedToSoilInfo,
	soilToFertilizerInfo,
	fertilizerToWaterInfo,
	waterToLightInfo,
	lightToTemperatureInfo,
	temperatureToHumidityInfo,
	humidityToLocationInfo,
]) {
	const movedRanges = [];
	for (const [destStart, sourceStart, length] of mapping) {
		const unmovedRanges = [];
		for (const { start, end } of ranges) {
			if (start < sourceStart + length && end >= sourceStart) {
				movedRanges.push({
					start: Math.max(start, sourceStart) - sourceStart + destStart,
					end: Math.min(end, sourceStart + length) - sourceStart + destStart,
				});
			}

			if (start < sourceStart || end >= sourceStart + length) {
				unmovedRanges.push({
					start: (start < sourceStart) ? start : Math.max(start, sourceStart + length),
					end: (end >= sourceStart + length) ? end : Math.min(end, sourceStart - 1),
				});
			}
		}

		ranges = unmovedRanges;
	}

	ranges.push(...movedRanges);
}

console.log(`Day 5 - Part 2 solution is: ${Math.min(...ranges.flatMap(Object.values))}`);
