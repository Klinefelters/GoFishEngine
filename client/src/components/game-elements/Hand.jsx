import { Box, Image } from "@chakra-ui/react";

export default function Hand  ({cards, index, size}) {
		const spacing=20;
		const handWidth = size*2/3 + spacing * cards.length;
		const renderCards = () => {
			
	
			return cards.map((_, index) => {
				const space = (index) * spacing;
	
				const cardStyle = {
					transform: `translate(${space}px)`,
					position: 'absolute',
					top: '50%',
					left: '50%',
					width: `${size*2/3}px`,
					height: `${size}px`,
					marginLeft: `-${handWidth/2}px`,
					marginTop: '-65px',
					zIndex: index,
				};
	
				return (
					<Image
						key={index}
						// src={`playing-cards/${card.rank}_of_${card.suit}.png`}
						src={"card-backs/default.png"}
						alt={`Card ${index}`}
						style={cardStyle}
					/>
				);
			});
		};
	
		return (
		<Box key={index} style={{ position: 'relative', width: `${handWidth}px`, height: '150px' }}>
				{renderCards()}
		</Box>
		);
	};