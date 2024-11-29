import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const input = await readFile(new URL("input.txt", import.meta.url), "utf8");

const info = input.trimEnd().split("\n");
const hands = info.map((line) => line.split(" "));

const cards = "AKQJT98765432";
const getHandRank = (hand) => {
	const countPerCard = {};
	for (const card of hand) {
		countPerCard[card] = (countPerCard[card] || 0) + 1;
	}

	const [high, secondHigh] = Object.entries(countPerCard)
		.sort((a, b) => b[1] - a[1] || cards.indexOf(a[0]) - cards.indexOf(b[0]));
	return {
		5: 7,
		4: 6,
		3: (secondHigh?.[1] === 2) ? 5 : 4,
		2: (secondHigh?.[1] === 2) ? 3 : 2,
		1: 1,
	}[high[1]];
};

hands.sort(([handA], [handB]) => {
	const rankA = getHandRank(handA);
	const rankB = getHandRank(handB);
	if (rankA !== rankB) return rankA - rankB;
	for (let i = 0; i < 5; i++) {
		if (cards.indexOf(handA[i]) !== cards.indexOf(handB[i])) {
			return cards.indexOf(handB[i]) - cards.indexOf(handA[i]);
		}
	}

	return 0;
});

console.log(`Day 7 - Part 1 solution is: ${hands.reduce((acc, cur, i) => acc + (Number(cur[1]) * (i + 1)), 0)}`);
