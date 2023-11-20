import Books from "./game-elements/Books";

export default function Sidebar ({gameState}) {
	return (
		<Books books={gameState.books} />
	);
}