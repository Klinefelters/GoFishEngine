import { Modal, ModalOverlay, ModalContent,} from '@chakra-ui/react'
import Logo from './game-elements/Logo'


export default function Welcome({ isOpen, onClose }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} >
		<ModalOverlay />
			<ModalContent bg="transparent" borderRadius="2xl" >
				<Logo/>
			</ModalContent>
		</Modal>
	)
}