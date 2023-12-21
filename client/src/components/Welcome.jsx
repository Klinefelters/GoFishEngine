import { Modal, ModalOverlay, ModalContent, Flex,} from '@chakra-ui/react'
import Logo from './game-elements/Logo'

export default function Welcome({ isOpen, onClose }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered={false} size="full" >
		<ModalOverlay />
			<ModalContent bg="transparent" backdropFilter="blur(10px)" 
				width="100vw" height="100vh" margin="0" maxW="none" maxH="none">
				<Flex width="100%" height="100%" justifyContent="center" alignItems="center" onClick={onClose}>
					<Logo/>
				</Flex>
			</ModalContent>
		</Modal>
	)
}