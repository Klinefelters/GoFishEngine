import { Button } from '@chakra-ui/react';
import ApiService from '../../services/apiService';

export default function ResetButton({getGameState}) {
    const reset = async () => {
        await ApiService.resetGame()
        getGameState()
    };
    return (
        <Button onClick={reset}>Reset</Button>
    )
}