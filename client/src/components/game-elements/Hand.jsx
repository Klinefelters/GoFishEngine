import { Box, Image } from "@chakra-ui/react";

export default function Hand  ({cards, index, size, publicCards}) {
		const spacing=20;
		const handWidth = size*2/3 + spacing * cards.length;
		const renderCards = () => {
			return cards.map((card, index) => {
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
					transition: 'transform 0.6s',
                	transformStyle: 'preserve-3d'
				};

				const isCardPublic = publicCards && publicCards.some(publicCard => publicCard && publicCard.rank === card.rank && publicCard.suit === card.suit);
            	const cardImage = isCardPublic ? `playing-cards/${card.rank}_of_${card.suit.toLowerCase()}.png` : "card-backs/default.png";
	
				return (
					<Box
                    key={index}
                    style={{
                        ...cardStyle,
                        transform: `translate(${space}px) rotateY(${isCardPublic ? '0deg' : '180deg'})`
                    }}
                >
					<Image
						src={cardImage}
						alt={`Card ${index}`}
						style={{ backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%' }}
					/>
					<Image
                        src="card-backs/default.png"
                        alt={`Card back ${index}`}
                        style={{ backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%', transform: 'rotateY(180deg)' }}
                    />
				</Box>
				);
			});
		};
	
		return (
		<Box key={index} style={{ position: 'relative', width: `${handWidth}px`, height: '150px' }}>
				{renderCards()}
		</Box>
		);
	};