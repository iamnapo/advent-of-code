import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const input = await readFile(new URL("input.txt", import.meta.url), "utf8");

const info = input.trimEnd().split("\n");
const hands = info.map((line) => line.split(" "));

const cardsWithoutJ = "AKQT98765432";
const cards = [...cardsWithoutJ, "J"];
const getHandRank = (hand) => {
	const countPerCard = [...hand].reduce((acc, card) => ({ ...acc, [card]: (acc[card] || 0) + 1 }), {});
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

const getHandRankForAnyJoker = (hand) => {
	const JsInHand = [...hand].filter((card) => card === "J").length;
	switch (JsInHand) {
		case 0: {
			return getHandRank(hand);
		}

		case 1: {
			return Math.max(...[...cardsWithoutJ].map((card) => getHandRank(hand.replace("J", card))));
		}

		case 2: {
			return Math.max(...[...cardsWithoutJ].flatMap((card1) => [...cardsWithoutJ].map((card2) => getHandRank(hand.replace("J", card1).replace("J", card2)))));
		}

		case 3: {
			return Math.max(...[...cardsWithoutJ].flatMap((card1) => [...cardsWithoutJ].flatMap((card2) => [...cardsWithoutJ].map((card3) => getHandRank(hand.replace("J", card1).replace("J", card2).replace("J", card3))))));
		}

		default: {
			return 7;
		}
	}
};

hands.sort(([handA], [handB]) => {
	const rankA = getHandRankForAnyJoker(handA);
	const rankB = getHandRankForAnyJoker(handB);
	if (rankA !== rankB) return rankA - rankB;
	for (let i = 0; i < 5; i++) {
		if (cards.indexOf(handA[i]) !== cards.indexOf(handB[i])) {
			return cards.indexOf(handB[i]) - cards.indexOf(handA[i]);
		}
	}

	return 0;
});

console.log(`Day 7 - Part 2 solution is: ${hands.reduce((acc, cur, i) => acc + (Number(cur[1]) * (i + 1)), 0)}`);
