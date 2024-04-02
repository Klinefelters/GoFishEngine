import { Flex, IconButton } from '@chakra-ui/react';
import { RepeatIcon, SettingsIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaPlay, FaPause } from "react-icons/fa";
import ApiService from '../services/apiService';

export default function ControlButtons({getGameState, setSummary, settings, setSettings, settingsOpen}) {
    const playPause = () => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            buttons: {
                ...prevSettings.buttons,
                paused: {
                    ...prevSettings.buttons.paused,
                    val: !prevSettings.buttons.paused.val,
                },
            },
        }));
    };
    const reset = async () => {
        await ApiService.resetGame()
        getGameState()
    };
    const step = async () => {
        setSummary( await ApiService.playRound({}))
        getGameState()
    };
    return (
        <Flex
            position="fixed"
            top="10px"
            left="10px"
            padding="10px"
        >
            <IconButton variant='outline' colorScheme="teal" onClick={settingsOpen} icon={<SettingsIcon />}/>
            <IconButton variant='outline' colorScheme="teal" onClick={playPause} icon={settings.buttons.paused.val ? <FaPlay /> : <FaPause/>}/>
            <IconButton variant='outline' colorScheme="teal" onClick={step} icon={<ChevronRightIcon />}/>
            <IconButton variant='outline' colorScheme="teal" onClick={reset} icon={<RepeatIcon />}/>
        </Flex>
    )
}