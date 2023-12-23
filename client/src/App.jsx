import { Flex, useDisclosure} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ApiService from './services/apiService';
import Table from './components/game-elements/Table';
import Welcome from './components/Welcome';
import Settings from './components/Settings';

export default function App() {
	const { isOpen: welcomeIsOpen, onClose: welcomeClose, onOpen: welcomeOpen } = useDisclosure();
	const { isOpen: settingsIsOpen, onClose: settingsClose, onOpen: settingsOpen } = useDisclosure();
	const [summary, setSummary] = useState({
		request: {player: 0, target: 0, rank: "A", suit:"Spades"},
		response: {cards: []},
		seat: 0,
	});
	const [settings, setSettings] = useState({
		sliders:{
			tickInterval: {val:2000, min:250, max:5000, step:10, label:'Tick Interval (ms)', ref:"tickInterval"},
			cardSize: {val:100, min:10, max:200, step:1, label:'Card Size (px)', ref:"cardSize"},
		},
		buttons:{
			paused: {val: false, trueLabel:'Start', falseLabel:'Pause', ref:'paused', trueColor:'green', falseColor:'red'},
		},
		cardVision: "normal"
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
					if (summary.seat == -1){(await ApiService.resetGame({}))}
				};
				if (welcomeIsOpen || settingsIsOpen || settings.buttons.paused.val){
					return;
				}else{
					playRound();
				}
		}, settings.sliders.tickInterval.val);

		return () => {
			clearInterval(intervalId);
		};
	}, [welcomeIsOpen, settingsIsOpen, settings]);

	return(
		<>
			<Flex bg="brand.green" style = {{flex: 1}} h="100vh" overflow="hidden">
				<Table gameState={gameState} settings={settings} summary={summary}/>
			</Flex>
			<Welcome onClose={welcomeClose} isOpen={welcomeIsOpen} />
			<Settings settings={settings} setSettings={setSettings} onClose={settingsClose} isOpen={settingsIsOpen} />
		</>
	);
}