import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalHeader,
} from '@chakra-ui/react'
import SlidersContainer from './settings-elements/SlidersContainer';

export default function Settings({ settings, setSettings, isOpen, onClose }) {

	const handleSliderChange = (value, label) => {
    setSettings((prevSettings) => ({
      sliders: {
        ...prevSettings.sliders,
        [label]: {
          ...prevSettings.sliders[label],
          val: value,
        },
      },
    }));
  };

	return (
		<Modal isOpen={isOpen} onClose={onClose} >
			<ModalOverlay />
			<ModalContent bg="brand.900" borderRadius="2xl" >
				<ModalHeader textAlign="center" color="white">Settings</ModalHeader>
				<ModalBody>
					<SlidersContainer sliders={settings.sliders} onSliderChange={handleSliderChange} />
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}