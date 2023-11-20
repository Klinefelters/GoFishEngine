import Books from "./game-elements/Books";

export default function Sidebar ({gameState, settings}) {
	return (
		<Books books={gameState.books} size={settings.sliders.cardSize.val} />
	);
}