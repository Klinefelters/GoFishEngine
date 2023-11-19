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
        pool: Array.from({ length: 38 }),
        hands: [
            {cards: [
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
            ]},
            {cards: [
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
            ]},
            {cards: [
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
            ]},
            {cards: [
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
            ]},
            {cards: [
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
            ]},
            {cards: [
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
            ]},
            {cards: [
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
                { suit: "", rank: "" }, 
            ]},
            
        ]
      });
    

    // useEffect(() => {
    //     const getGameState = async () => {setGameState( await ApiService.getGameState({}))};
    //     getGameState()
        
    //     const intervalId = setInterval(() => {
    //         const playRound = async () => {
    //             setSummary( await ApiService.playRound({}))
    //             if (summary.seat == -1){clearInterval(intervalId)}

    //         };
    //         playRound()
    //     }, 1000);
        
    //     // Clear the interval when the component unmounts
    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, []);

    return(
        <Flex bg="brand.300" style = {{flex: 1}} h="100vh" >
            <Table gameState={gameState}/>
            <Sidebar/>
        </Flex>
    );
}