import Hand from "./Hand";
import { Avatar, Box, Flex, Spacer } from "@chakra-ui/react";
import Typewriter from 'typewriter-effect';
import {useState, useEffect} from "react";

export default function Player ({cards, name, src, size, publicCards, seat, summary, settings}) {
	const [text, setText] = useState("");

    useEffect(() => {
        let newText = "";
		let delay=0;
		if (!summary.request){
			console.log("game over");
		}
        else if (seat === summary.request.player && summary.request.rank) {
            newText = `Player ${summary.request.target + 1} do you have any ${summary.request.rank}'s`;
        } else if (seat === summary.request.player && !summary.request.rank) {
            newText = `Pass`;
        } else if (seat === summary.request.target && !(summary.response.cards.length === 0) && summary.request.rank) {
            newText = `Here, have my ${summary.response.cards.length} ${summary.request.rank}`;
			if (summary.response.cards.length > 1){
				newText += "'s";
			}
			delay=settings.sliders.tickInterval.val/10;
        } else if (seat === summary.request.target && (summary.response.cards.length === 0) && summary.request.rank) {
            newText = `Go Fish`;
			delay=settings.sliders.tickInterval.val/5;
        }

        const timeoutId = setTimeout(() => {
            setText(newText);
        }, delay); 

        return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts
    }, [seat, summary, cards]);

	return(
		<Box >
		<Flex >
			<Spacer/>
			<Avatar h="50px" w="50px" name={name} src={src}/>
			<Box w="200px" h="50px" m="5px" p="5px" fontSize="sm" textAlign="center"borderRadius="xl" bg="rgba(0,0,255,.25)">
				<Typewriter
					options={{
						strings: [text],
						autoStart: true,
						loop: false,
						delay: settings.sliders.tickInterval.val/90,
        				deleteSpeed: settings.sliders.tickInterval.val/90,
						pauseFor: settings.sliders.tickInterval.val/10,
					}}
				/>
			</Box>
			<Spacer/>
		</Flex>
		<Flex>
			<Spacer/>
			<Hand cards={cards} size={size} publicCards={publicCards}/>
			<Spacer/>
		</Flex>
		
		</Box>
	);
}