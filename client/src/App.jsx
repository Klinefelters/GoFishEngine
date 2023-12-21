import {Flex, Spinner, useDisclosure} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ApiService from './services/apiService';
import Table from './components/game-elements/Table';
import Sidebar from './components/Sidebar';
import Welcome from './components/Welcome';
import Settings from './components/Settings';

export default function App() {
	const [loading, setLoading] = useState(true);
	const { isOpen: welcomeIsOpen, onClose: welcomeClose, onOpen: welcomeOpen } = useDisclosure();
	const { isOpen: settingsIsOpen, onClose: settingsClose, onOpen: settingsOpen } = useDisclosure();
	const [summary, setSummary] = useState({
		request: {player: 0, target: 0, rank: "A", suit:"Spades"},
		response: {cards: []},
		seat: 0,
	});
	const [settings, setSettings] = useState({
		sliders:{
			tickInterval: {val:2000, min:1000, max:5000, step:10, label:'Tick Interval (ms)', ref:"tickInterval"},
			cardSize: {val:100, min:10, max:200, step:1, label:'Card Size (px)', ref:"cardSize"},
		},
		buttons:{
			paused: {val: false, trueLabel:'Start', falseLabel:'Pause', ref:'paused', trueColor:'green', falseColor:'red'},
		}
	});
	const [gameState, setGameState] = useState({
		pool: {cards: Array.from({ length: 38 })},
		books: [],
		hands: [{cards: Array.from({ length: 7 })}, {cards: Array.from({ length: 7 })},],
		publicHands:[{cards: Array.from({ length: 7 })}, {cards: Array.from({ length: 7 })},]
	});

	useEffect(() => {welcomeOpen();}, []);

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
		const getGameState = async () => {setGameState( await ApiService.getGameState({}))};
		getGameState()
		setLoading(false);

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
		{loading ? (
			// Display the loading module while the page is still loading
			<Flex align="center" justify="center" height="100vh" backgroundColor="gray.100">
				<Spinner size="xl" />
			</Flex>
		) : (
			<>
			<Flex bg="brand.300" style = {{flex: 1}} h="100vh" >
					<Table gameState={gameState} settings={settings} summary={summary}/>
					<Sidebar gameState={gameState} settings={settings}/>
			</Flex>
			<Welcome onClose={welcomeClose} isOpen={welcomeIsOpen} />
			<Settings settings={settings} setSettings={setSettings} onClose={settingsClose} isOpen={settingsIsOpen} />
			</>
			)}
			</>
	);
}