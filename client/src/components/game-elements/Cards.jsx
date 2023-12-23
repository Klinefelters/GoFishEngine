import { Box } from "@chakra-ui/react";
import Card from "./card";

export default function Cards({ cards, size, animationTime }) {
    return (
        <>
            {cards.map((card, index) => (
                <Card 
                    key={index} 
                    card={card} 
                    depth={card.index}
                    size={size} 
                    isCardPublic={card.public}
                    animationTime={animationTime}
                    position={card.position}
                />
            ))}
        </>
    );
}