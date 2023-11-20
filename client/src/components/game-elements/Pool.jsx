import Hand from "./Hand";

export default function Pool  ({numberOfCards}) {
		const cards = Array.from({ length: numberOfCards });
		return (
			<Hand cards={cards} index={0} />
		);
	};