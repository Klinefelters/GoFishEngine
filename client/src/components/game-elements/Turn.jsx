import { 
    Modal,
    ModalOverlay,
    ModalContent,
    Flex, 
    Image, 
    Text 
} from '@chakra-ui/react'

export default function Turn({ isOpen, onClose, summary }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} closeOnEsc={false} >
		<ModalOverlay />
			<ModalContent bg="transparent" backdropFilter="blur(10px)" borderRadius="2xl" >
				<Flex w="50vw" h="50vh">
                    <Image p="1em" h="50vh" w="15vw" src={summary.request.suit ? (`playing-cards/${summary.request.rank}_of_${summary.request.suit.toLowerCase()}.png`) :"card-backs/default.png" }/>
                    <Flex direction="column" justifyContent="center" alignItems="center">
                        <Text>Player {summary.request.player} asked Player {summary.request.target} for a {summary.request.rank}</Text>
                        <Text>Player {summary.request.target} gave them {summary.response.cards.length} cards</Text>
				    </Flex>
                </Flex>
			</ModalContent>
		</Modal>
	)
}