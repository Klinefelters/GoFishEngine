import { Box, Image, Spacer, Flex, Avatar } from "@chakra-ui/react";


export default function Book  ({rank, style, player}) {
	const cards = [
			{rank:`${rank}`, suit:"diamonds"},
			{rank:`${rank}`, suit:"hearts"},
			{rank:`${rank}`, suit:"clubs"},
			{rank:`${rank}`, suit:"spades"},
	];
	const spacing=20;
	const handWidth = 55 + spacing * cards.length;
	const renderCards = () => {
		

		return cards.map((card, index) => {
			const space = (index) * spacing;

			const cardStyle = {
				transform: `translate(${space}px)`,
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: '75px', // Adjust the size of the card images
				height: '115px', // Adjust the size of the card images
				marginLeft: `-${handWidth/2}px`,
				marginTop: '-65px',
				zIndex: index,
			};

			return (
				<Image
					key={index}
					src={`playing-cards/${card.rank}_of_${card.suit.toLowerCase()}.png`}
					style={cardStyle}
				/>
			);
		});
	};

	return (
		<Flex style={style}>
			<Spacer />
			<Box style={{ position: 'relative', width: `${handWidth}px`, height: '150px' }}>
				{renderCards()}
			</Box>
			<Avatar mt={2} src={`players/player${player+1}.png`} name={`Player ${player+1}`}/>
			<Spacer />
		</Flex>
	);
};