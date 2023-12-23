import { Button } from '@chakra-ui/react';
import ApiService from '../../services/apiService';

export default function ResetButton() {
    const reset = async () => {await ApiService.resetGame()};
    return (
        <Button onClick={reset}>Reset</Button>
    )
}