import {Box} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import GameService from '../services/gameService';

export default function Game() {
    const [data, setData] = useState({});

    
    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.post('http://localhost:8000/getRound', {})
            .then(response => {
                console.log(response.data); 
                setData(response.data)
                if (data.seat == -1){
                    console.log("Game Over")
                    clearInterval(intervalId);
                }
            
            })
            .catch(error => {
                console.error(error); 
            });
        }, 1000);
        
        // Clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return(
        <Box bg="brand.600" style = {{flex: 1}} h="90vh">
            {`${data.books}`}
        </Box>
    );
}