import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalHeader,
} from '@chakra-ui/react'
import SlidersContainer from './settings-elements/SlidersContainer';
import ButtonsContainer from './settings-elements/ButtonsContainer';

export default function Settings({ settings, setSettings, isOpen, onClose }) {

	const handleSliderChange = (value, ref) => {
    setSettings((prevSettings) => ({
      sliders: {
        ...prevSettings.sliders,
        [ref]: {
          ...prevSettings.sliders[ref],
          val: value,
        },
      },
	  buttons: {...prevSettings.buttons},
    }));
  };
  const handleButtonChange = (value, ref) => {
    setSettings((prevSettings) => ({
      sliders: {...prevSettings.sliders},
	  buttons: {
		...prevSettings.buttons,
		[ref]: {
			...prevSettings.buttons[ref],
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
					<ButtonsContainer buttons={settings.buttons} onButtonChange={handleButtonChange}/>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}