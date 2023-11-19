import {Box} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ApiService from '../services/apiService';

export default function Game() {
    const [summary, setSummary] = useState({});
    const [gameState, setGameState] = useState({});
    

    useEffect(() => {
        const getGameState = async () => {setGameState( await ApiService.getGameState({}))};
        getGameState()
        console.log(gameState)
        
        const intervalId = setInterval(() => {
            const playRound = async () => {
                setSummary( await ApiService.playRound({}))
                if (summary.seat == -1){clearInterval(intervalId)}

            };
            playRound()
            console.log(summary)
        }, 1000);
        
        // Clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return(
        <Box bg="brand.600" style = {{flex: 1}} h="90vh">
        </Box>
    );
}