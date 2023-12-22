import Hand from "./Hand";
import { Avatar, Box, Flex, Spacer } from "@chakra-ui/react";
import Typewriter from 'typewriter-effect';
import {useState, useEffect} from "react";

export default function Player ({cards, name, src, size, publicCards, seat, summary, settings}) {
	const [text, setText] = useState("");
	const [color, setColor] = useState("transparent");
	const [shown, setShown] = useState(false);

    useEffect(() => {
        let newText = "";
		let newColor = "transparent";
		let newShown = false;
		let delay=0;
		if (!summary.request){
			console.log("game over");
		}
        else if (seat === summary.request.player && summary.request.rank) {
			newShown = true;
            newText = `Player ${summary.request.target + 1} do you have any ${summary.request.rank}'s`;
			newColor = "rgba(0, 0, 255, 0.25)"
		} else if (seat === summary.request.player && !summary.request.rank) {
			newShown = true;
            newText = `Pass`;
			newColor = "rgba(0, 0, 255, 0.25)"
        } else if (seat === summary.request.target && !(summary.response.cards.length === 0) && summary.request.rank) {
            newShown = true;
			if (summary.response.cards.length > 1){
				newText = `Here, have my ${summary.response.cards.length} ${summary.request.rank}'s`;
			}else{
				newText = `Here, have my ${summary.request.rank}`;
			}
			newColor = "rgba(0, 255, 0, 0.25)"
			delay=settings.sliders.tickInterval.val/10;
        } else if (seat === summary.request.target && (summary.response.cards.length === 0) && summary.request.rank) {
            newShown = true;
			newText = `Go Fish`;
			newColor = "rgba(255, 0, 0, 0.25)"
			delay=settings.sliders.tickInterval.val/5;
        }

        const timeoutId = setTimeout(() => {
			setShown(newShown)
            setText(newText);
			setColor(newColor)
        }, delay); 

		setTimeout(() => {
			setShown(false)
        }, settings.sliders.tickInterval.val * 8/10);

        return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts
    }, [seat, summary, cards]);

	return(
		<Box >
		<Flex >
			<Spacer/>
			<Avatar h="50px" w="50px" name={name} src={src}/>
			<Box
				w="200px"
				h="50px"
				m="5px"
				p="5px"
				fontSize="sm"
				textAlign="center"
				borderRadius="xl"
				opacity={shown ? 1 : 0}
				bg={color}
				style={{
					transition: `opacity ${settings.sliders.tickInterval.val / 10}ms`
				}}
			>	{/* <Typewriter
					options={{
						strings: [text],
						autoStart: true,
						loop: false,
						delay: settings.sliders.tickInterval.val/90,
        				deleteSpeed: settings.sliders.tickInterval.val/90,
						pauseFor: settings.sliders.tickInterval.val/10,
					}}
				/> */}
				{text}
			</Box>
			<Spacer/>
		</Flex>
		<Flex>
			<Spacer/>
			<Hand cards={cards} size={size} publicCards={publicCards} godMode={settings.cardVision ==="GodMode"? true:false} hidden={settings.cardVision ==="Hidden"? true:false}/>
			<Spacer/>
		</Flex>
		
		</Box>
	);
}