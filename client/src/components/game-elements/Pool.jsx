import Hand from "./Hand";

export default function Pool  ({numberOfCards, size}) {
		const cards = Array.from({ length: numberOfCards });
		return (
			<Hand cards={cards} index={0} size={size} />
		);
	};