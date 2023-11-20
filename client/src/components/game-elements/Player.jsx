import Hand from "./Hand";
import { Avatar, Box, Flex, Spacer } from "@chakra-ui/react";

export default function Player ({cards, name}) {
	return(
		<Box >
		<Flex>
			<Spacer/>
			<Avatar name={name}/>
			<Spacer/>
		</Flex>
		<Flex>
			<Spacer/>
			<Hand cards={cards}/>
			<Spacer/>
		</Flex>
		
		</Box>
	);
}