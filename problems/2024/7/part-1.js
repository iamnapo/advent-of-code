import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const equations = [];
for await (const line of lines) {
	const [testValue, numbers] = line.split(":");
	equations.push({
		testValue: Number(testValue),
		numbers: numbers.split(" ").map(Number),
	});
}

const canMatchTestValue = (numbers, testValue) => {
	const stack = [{ index: 0, result: numbers[0] }];

	while (stack.length > 0) {
		const { index, result } = stack.pop();

		if (index === numbers.length - 1) {
			if (result === testValue) return true;
		} else {
			const nextIndex = index + 1;
			const nextNum = numbers[nextIndex];

			stack.push(
				{ index: nextIndex, result: result + nextNum },
				{ index: nextIndex, result: result * nextNum },
			);
		}
	}

	return false;
};

let totalCalibrationResult = 0;

for (const { testValue, numbers } of equations) {
	if (canMatchTestValue(numbers, testValue)) totalCalibrationResult += testValue;
}

console.log(`Day 7 - Part 1 solution is: ${totalCalibrationResult}`);
