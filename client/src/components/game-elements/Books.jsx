import { Avatar, Box, Fade } from "@chakra-ui/react";

export default function Books ({books, size, animationTime}){

	const renderBooks = () => {
		
		return books.map((book, index) => {
			return (
				<Box zIndex={4 + index*4} key={index}>
					<Fade in={true} transition={{exit: {delay: 1}, enter: {delay: animationTime / 1000, duration: animationTime / 1000}}}>
						<Avatar
							position="fixed"
							top={`${10  + index * (size / 2 )}px`}
							right={`${10 + size * 4/6}px`}
							w={`${size/2}px`}
							h={`${size/2}px`}
							name={`Player ${book.player + 1}`}
							src={`players/player${book.player + 1}.png`}
						/>
					</Fade>
				</Box>
			);
		});
	};

	return(
		<>
			{renderBooks()}
		</>
	);
}