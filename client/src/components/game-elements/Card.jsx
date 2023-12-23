import { Box, Image } from "@chakra-ui/react";

export default function Card({ depth=0, card={rank:"A", suit:"Hearts"}, position={x:0, y:0}, size=400, isCardPublic=false, animationTime=0.6 }) {
    const cardStyle = {
        position: 'fixed',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size*2/3}px`,
        height: `${size}px`,
        transition: `top ${animationTime}s, left ${animationTime}s, transform ${animationTime}s`,
        transformStyle: 'preserve-3d'
    };
    const cardImage = isCardPublic ? `playing-cards/${card.rank}_of_${card.suit.toLowerCase()}.png` : "card-backs/default.png";

    return (
        <Box
            zIndex={depth}
            style={{
                ...cardStyle,
                transform: `rotateY(${isCardPublic ? '0deg' : '180deg'})`
            }}
        >
            <Image
                src={cardImage}
                alt="Card"
                style={{ backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%' }}
            />
            <Image
                src="card-backs/default.png"
                alt="Card back"
                style={{ backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%', transform: 'rotateY(180deg)' }}
            />
        </Box>
    );
}