import { Avatar, Box, Flex } from "@chakra-ui/react";
import {useState, useEffect} from "react";

export default function Player ({ seat, summary, settings, position}) {
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
			newColor = "rgba(0, 0, 255, 0.3)"
		} else if (seat === summary.request.player && !summary.request.rank) {
			newShown = true;
            newText = `Pass`;
			newColor = "rgba(0, 0, 255, 0.3)"
        } else if (seat === summary.request.target && !(summary.response.cards.length === 0) && summary.request.rank) {
            newShown = true;
			if (summary.response.cards.length > 1){
				newText = `Here, have my ${summary.response.cards.length} ${summary.request.rank}'s`;
			}else{
				newText = `Here, have my ${summary.request.rank}`;
			}
			newColor = "rgba(0, 255, 0, 0.3)"
			delay=settings.sliders.tickInterval.val/10;
        } else if (seat === summary.request.target && (summary.response.cards.length === 0) && summary.request.rank) {
            newShown = true;
			newText = `Go Fish`;
			newColor = "rgba(255, 0, 0, 0.3)"
			delay=settings.sliders.tickInterval.val/5;
        }

        const timeoutId = setTimeout(() => {
			setShown(newShown)
            setText(newText);
			setColor(newColor)
        }, delay); 

		setTimeout(() => {
			setShown(false)
        }, settings.sliders.tickInterval.val * 3/5);

        return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts
    }, [seat, summary, settings]);

	return(
		<Flex position="fixed" top={`${position.y}px`} left={`${position.x}px`}>
			<Avatar h={`${settings.sliders.cardSize.val/2}px`} w={`${settings.sliders.cardSize.val/2}px`} name={`Player ${seat+1}`} src={`/players/player${seat+1}.png`}/>
			<Flex
				direction={"column"}
				w={`${settings.sliders.cardSize.val*2}px`}
				h={`${settings.sliders.cardSize.val/2}px`}
				p="2px"
				fontSize="md"
				justifyContent={"center"}
				textAlign="center"
				textColor={"white"}
				borderRadius="xl"
				opacity={shown ? 1 : 0}
				bg={color}
				style={{
					transition: `opacity ${settings.sliders.tickInterval.val / 5}ms`
				}}
			>
				{text}
			</Flex>
		</Flex>
		
	);
}