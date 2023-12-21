import { Box, SimpleGrid, Flex, Spacer } from "@chakra-ui/react";
import Player from "./Player";
import Pool from "./Pool";

export default function Table({ gameState, settings, summary }) {
		const numPlayers = gameState.hands.length;
	
		const renderFirstPlayers = () => {
			return gameState.hands.map((hand, index) => {
				if (index < numPlayers / 2) {
					return <Player size={settings.sliders.cardSize.val} settings={settings} seat={index} key={index} cards={hand.cards} publicCards={gameState.publicHands[index].cards} name={`player ${index + 1}`} src={`players/player${index + 1}.png`} summary={summary} />;
				} else {
					return null;
				}
			});
		};
	
		const renderLastPlayers = () => {
			return gameState.hands.map((hand, index) => {
				if (index >= numPlayers / 2) {
					return <Player size={settings.sliders.cardSize.val} settings={settings} seat={index} key={index} cards={hand.cards} publicCards={gameState.publicHands[index].cards} name={`player ${index + 1}`} src={`players/player${index + 1}.png`} summary={summary} />;
				} else {
					return null;
				}
			});
		};
		
		return (
			<Box bg="brand.green">
				<SimpleGrid my="2.5vh" mx="2.5vw" w="75vw" minChildWidth={`${settings.sliders.cardSize.val}px`} spacing="40px">
					{renderFirstPlayers()}
				</SimpleGrid>
				<Flex>
					<Spacer />
					<Pool numberOfCards={gameState.pool.cards.length} size={settings.sliders.cardSize.val} />
					<Spacer />
				</Flex>
				<SimpleGrid my="2.5vh" mx="2.5vw" w="75vw" minChildWidth="120px" spacing="40px">
					{renderLastPlayers()}
				</SimpleGrid>
			</Box>
		);
	}
	