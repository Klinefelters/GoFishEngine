import { Box, Image } from "@chakra-ui/react";

export default function Hand  ({numberOfCards}) {
    const spacing=20;
    const handWidth = 55 + spacing * numberOfCards;
    const renderCards = () => {
    const cards = Array.from({ length: numberOfCards });

      return cards.map((_, index) => {
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
            // src={`playing-cards/${card.rank}_of_${card.suit}.png`}
            src={"card-backs/default.png"}
            alt={`Card ${index}`}
            style={cardStyle}
          />
        );
      });
    };
  
    return (
    <Box style={{ position: 'relative', width: `${handWidth}px`, height: '150px' }}>
        {renderCards()}
    </Box>
    );
  };