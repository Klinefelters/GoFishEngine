import { Box } from "@chakra-ui/react";
import Book from "./Book";

export default function Books ({books}){

	const renderBooks = () => {
		
		return books.map((book, index) => {
			const overlapOffset = index * 5;
			return (

				<Book key={index} rank={book.rank} player={book.player} style={{position: "absolute", top: `${overlapOffset}vh`,}}/>

			);
		});
	};

	return(
		<Box style={{ position: 'relative' }}>
			{renderBooks()}
		</Box>
	);
}
