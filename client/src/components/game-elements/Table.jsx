import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import Player from "./Player";
import Cards from "./Cards";
import Books from "./Books";

const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export default function Table({ gameState, settings, summary, welcomeIsOpen }) {
	const booksPos = {x:window.innerWidth-(settings.sliders.cardSize.val * (1 + 1/6) + 10), y:10};
	const [cards, setCards] = useState(() => {
		const initialCards = [];

		for (let suit of suits) {
			for (let rank of ranks) {
				initialCards.push({ 
					suit, 
					rank, 
					public: false,
					index: 0, 
					position: { x: window.innerWidth/2, y: window.innerHeight/2 } // Position the cards offscreen
				});
			}
		}

		return initialCards;
	});
	const updateCard = (rank, suit, publicStatus, position, index) => {
		setCards(cards => cards.map(card => 
			card.rank === rank && card.suit === suit 
				? { ...card, public: publicStatus, position: position, index: index } 
				: card
		));
	};
	function generatePlayerPositions(numPlayers, settings) {
		const positions = [];
		const topY = window.innerHeight / 4 + settings.sliders.cardSize.val / 4;
		const bottomY = window.innerHeight * 3 / 4 + settings.sliders.cardSize.val / 4;
		const width = window.innerWidth-(settings.sliders.cardSize.val * (1 + 1/6) + 20);

		const playersPerRow = Math.ceil(numPlayers / 2);
		const isOdd = numPlayers % 2 !== 0;

		for (let i = 0; i < numPlayers; i++) {
			const isBottomRow = i >= playersPerRow;
			const y = isBottomRow ? bottomY : topY;
			const x = isBottomRow && isOdd
				? (width / (playersPerRow )) * ((i % playersPerRow) + 1)
				: (width / (playersPerRow + 1)) * ((i % playersPerRow) + 1);
			positions.push({ x, y });
		}

		return positions;
	}
	const playerPositions = generatePlayerPositions(gameState.hands.length, settings);
	
	useEffect(() => {
		
		if (gameState) {
			for (let i = 0; i < gameState.hands.length; i++) {
				const hand = gameState.hands[i];
				const playerPosition = playerPositions[i];
				if (hand) {
					for (let j = 0; j < hand.cards.length; j++) {
						const card = hand.cards[j];
						const cardPosition = { 
							x: playerPosition.x + j * settings.sliders.cardSize.val / 6 - hand.cards.length * settings.sliders.cardSize.val / 12, 
							y: playerPosition.y - settings.sliders.cardSize.val/2
						};
						const publicCards = gameState.publicHands[i].cards;
						const isCardPublic = ((publicCards && publicCards.some(publicCard => publicCard && publicCard.rank === card.rank && publicCard.suit === card.suit) && !(settings.cardVision==="Hidden")) || (settings.cardVision==="GodMode"));
						updateCard(card.rank, card.suit.toLowerCase(), isCardPublic, cardPosition, j);
					}
				}
			}
			for (let i = 0; i < gameState.books.length; i++) {
				const hand = gameState.books[i];
				if (hand) {
					for (let j = 0; j < hand.cards.length; j++) {
						const card = hand.cards[j];
						const cardPosition = { 
							x: booksPos.x + j * settings.sliders.cardSize.val / 6, 
							y: booksPos.y + i * settings.sliders.cardSize.val / 2
						};
						updateCard(card.rank, card.suit.toLowerCase(), true, cardPosition, j+i*4);
					}
				}
			}
			for (let i = 0; i < gameState.pool.cards.length; i++) {
				const pos = {
					x:(window.innerWidth-(settings.sliders.cardSize.val * (1 + 1/6) + 20))/2-gameState.pool.cards.length*settings.sliders.cardSize.val/100,
					y:window.innerHeight/2-settings.sliders.cardSize.val/2 
				};
				const card = gameState.pool.cards[i];
				const cardPosition = { 
					x: pos.x + i * settings.sliders.cardSize.val / 50, 
					y: pos.y  
				};
				updateCard(card.rank, card.suit.toLowerCase(), (settings.cardVision==="GodMode"), cardPosition, gameState.pool.cards.length-i);
			}
		}
		// updateCard("A", "hearts", true, { x: 500, y: 200 });
	}, [gameState, settings, welcomeIsOpen]);

	return (
		<Flex h="100vh" w="100vw">
		{gameState.hands.map((hand, index) => (
			
			<Player 
				key={index}
				seat={index}
				summary={summary}
				settings={settings}
				position={{
					...playerPositions[index],
					y: playerPositions[index].y - settings.sliders.cardSize.val - 10
				}}
			/>
		))}
			<Cards 
				cards={cards} 
				size={settings.sliders.cardSize.val} 
				animationTime={settings.sliders.tickInterval.val/1000} 
			/>
			<Books 
				books={gameState.books} 
				size={settings.sliders.cardSize.val} 
				animationTime={settings.sliders.tickInterval.val}
			/>
		</Flex>
	);
}