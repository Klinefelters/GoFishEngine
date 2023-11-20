import Hand from "./Hand";
import { Avatar, Box, Flex, Spacer } from "@chakra-ui/react";

export default function Player ({cards, name, src, size}) {
	return(
		<Box >
		<Flex>
			<Spacer/>
			<Avatar name={name} src={src}/>
			<Spacer/>
		</Flex>
		<Flex>
			<Spacer/>
			<Hand cards={cards} size={size}/>
			<Spacer/>
		</Flex>
		
		</Box>
	);
}