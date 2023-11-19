import {Box, Flex} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ApiService from '../services/apiService';
import Player from '../components/game-elements/Player';
import Table from '../components/game-elements/Table';
import Sidebar from '../components/Sidebar';
// import Table from '../components/game-elements/Table';

export default function Game() {
    const [summary, setSummary] = useState({});
    const [gameState, setGameState] = useState({
        pool: {cards: Array.from({ length: 38 })},
        books: [
                {cards: Array.from({ length: 4 }), rank: "A"}, 
                {cards: Array.from({ length: 4 }), rank: "2"}, 
                {cards: Array.from({ length: 4 }), rank: "3"}, 
                {cards: Array.from({ length: 4 }), rank: "4"}, 
                {cards: Array.from({ length: 4 }), rank: "5"}, 
                {cards: Array.from({ length: 4 }), rank: "6"}, 
                {cards: Array.from({ length: 4 }), rank: "7"}, 
                {cards: Array.from({ length: 4 }), rank: "8"}, 
                {cards: Array.from({ length: 4 }), rank: "9"}, 
                {cards: Array.from({ length: 4 }), rank: "10"}, 
                {cards: Array.from({ length: 4 }), rank: "J"}, 
                {cards: Array.from({ length: 4 }), rank: "Q"}, 
                {cards: Array.from({ length: 4 }), rank: "K"}, 
            ],
        hands: [
            {cards: Array.from({ length: 7 })},
            {cards: Array.from({ length: 7 })},
        ]
      });
    

    useEffect(() => {
        const getGameState = async () => {setGameState( await ApiService.getGameState({}))};
        getGameState()

        const intervalId = setInterval(() => {
            const playRound = async () => {
                setSummary( await ApiService.playRound({}))
                getGameState()
                if (summary.seat == -1){(await ApiService.resetGame({}))}

            };
            playRound()
        }, 2000);
        
        // Clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return(
        <Flex bg="brand.300" style = {{flex: 1}} h="100vh" >
            <Table gameState={gameState}/>
            <Sidebar gameState={gameState}/>
        </Flex>
    );
}