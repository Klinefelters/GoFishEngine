import { Box, SimpleGrid, Heading, Flex, Spacer } from "@chakra-ui/react";
import Player from "./Player";
import Pool from "./Pool";

export default function Table  ({gameState}) {
    const numPlayers = gameState.hands.length
    const renderFirstPlayers = () => {  
      return gameState.hands.map((hand, index) => {
        if (index < numPlayers/2){
            return (
                <Player cards={hand.cards} name={`player ${index+1}`}/>
            );
        }else {
            return <></>
        }
      });
    };
    const renderLastPlayers = () => {  
        return gameState.hands.map((hand, index) => {
          if (index < numPlayers/2){
            return <></>
              
          }else {
            return (
                <Player cards={hand.cards} name={`player ${index+1}`}/>
            );
          }
        });
      };

  
    return (
        <Box bg="brand.green">
            <SimpleGrid my="2.5vh" mx="2.5vw" w="75vw" minChildWidth='120px' spacing='40px'>
 
                {renderFirstPlayers()}
 
            </SimpleGrid>
            <Flex>
                <Spacer/>
                <Pool numberOfCards={gameState.pool.length}/>
                <Spacer/>
            </Flex>
            <SimpleGrid my="2.5vh" mx="2.5vw" w="75vw" minChildWidth='120px' spacing='40px'>
 
                {renderLastPlayers()}
 
            </SimpleGrid>
        </Box>
    );
  };