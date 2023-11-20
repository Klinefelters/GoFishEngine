import { Box } from "@chakra-ui/react";
import Book from "./Book";

export default function Books ({books}){

	const renderBooks = () => {
		return books.map((book, index) => {
			return (
			<Book key={index} rank={book.rank}/>
			);
		});
	};

	return(
		<Box>
			{renderBooks()}
		</Box>
	);
}
