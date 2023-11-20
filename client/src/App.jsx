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
	const [summary, setSummary] = useState({});
	const [settings, setSettings] = useState({
		sliders:{
			tickInterval: {val:2000, min:500, max:2000, step:10, label:'Tick Interval', ref:"tickInterval"},
		},
	});
	const [gameState, setGameState] = useState({
		pool: {cards: Array.from({ length: 38 })},
		books: [],
		hands: [{cards: Array.from({ length: 7 })}, {cards: Array.from({ length: 7 })},]
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
				if (welcomeIsOpen || settingsIsOpen){
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
					<Table gameState={gameState}/>
					<Sidebar gameState={gameState}/>
			</Flex>
			<Welcome onClose={welcomeClose} isOpen={welcomeIsOpen} />
			<Settings settings={settings} setSettings={setSettings} onClose={settingsClose} isOpen={settingsIsOpen} />
			</>
			)}
			</>
	);
}