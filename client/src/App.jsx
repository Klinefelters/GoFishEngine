import { Flex, useDisclosure} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ApiService from './services/apiService';
import Table from './components/game-elements/Table';
import Welcome from './components/Welcome';
import Settings from './components/Settings';
import GameOver from './components/GameOver';
import ControlButtons from './components/ControlButtons';

export default function App() {
	const { isOpen: welcomeIsOpen, onClose: welcomeClose, onOpen: welcomeOpen } = useDisclosure();
	const { isOpen: gameOverIsOpen, onClose: gameOverClose, onOpen: gameOverOpen } = useDisclosure();
	const { isOpen: settingsIsOpen, onClose: settingsClose, onOpen: settingsOpen } = useDisclosure();
	const [summary, setSummary] = useState({
		request: {player: 0, target: 0, rank: "A", suit:"Spades"},
		response: {cards: []},
		seat: 0,
	});
	const [settings, setSettings] = useState({
		sliders:{
			tickInterval: {val:2000, reset:2000, min:250, max:5000, step:10, label:'Tick Interval (ms)', ref:"tickInterval"},
			cardSize: {val:100, reset:100, min:10, max:200, step:1, label:'Card Size (px)', ref:"cardSize"},
		},
		buttons:{
			paused: {val: false, trueLabel:'Start', falseLabel:'Pause', ref:'paused', trueColor:'green', falseColor:'red'},
		},
		cardVision: "BotView"
	});
	const [gameState, setGameState] = useState({
		pool: {cards: []},
		books: [],
		hands: [{cards: []}, {cards: []},],
		publicHands:[{cards: Array.from({ length: 7 })}, {cards: Array.from({ length: 7 })},]
	});
	const getGameState = async () => {setGameState( await ApiService.getGameState({}))};

	useEffect(() => {
		welcomeOpen();
		getGameState();
	}, []);

	const handleKeyPress = (event) => {
		if (event.key === 'Escape') {settingsOpen();}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [settingsOpen]);
		
	useEffect(() => {
		const intervalId = setInterval(() => {
				const playRound = async () => {
					
					setSummary( await ApiService.playRound({}))
					getGameState()
				};
				if (welcomeIsOpen || settingsIsOpen || settings.buttons.paused.val || gameOverIsOpen){
					return;
				}else{
					playRound();
				}
		}, settings.sliders.tickInterval.val);

		return () => {
			clearInterval(intervalId);
		};
	}, [welcomeIsOpen, settingsIsOpen, gameOverIsOpen, settings]);

	return(
		<>
			<Flex 
				bg="radial-gradient(circle,  #1E5C3A, rgba(0,0,0,1))"
				style = {{flex: 1}} 
				h="100vh" 
				overflow="hidden"
			>
				<Table 
					gameState={gameState} 
					settings={settings} 
					summary={summary} 
					welcomeIsOpen={welcomeIsOpen}
				/>
			</Flex>
			<ControlButtons getGameState={getGameState} settings={settings} setSettings={setSettings} settingsOpen={settingsOpen} />
			<Welcome onClose={welcomeClose} isOpen={welcomeIsOpen} />
			<GameOver getGameState={getGameState} onClose={gameOverClose} isOpen={gameOverIsOpen} open={gameOverOpen} summary={summary} welcomeOpen={welcomeOpen} />
			<Settings getGameState={getGameState} settings={settings} setSettings={setSettings} onClose={settingsClose} isOpen={settingsIsOpen} />
		</>
	);
}