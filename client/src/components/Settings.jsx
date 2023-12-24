import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalHeader,
	Select,
} from '@chakra-ui/react'
import SlidersContainer from './settings-elements/SlidersContainer';
import ButtonsContainer from './settings-elements/ButtonsContainer';

export default function Settings({ settings, setSettings, isOpen, onClose, getGameState }) {

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
  const handleCardVisionChange = (event) => {
	setSettings((prevSettings) => ({
		...prevSettings,
		cardVision: event.target.value,
	}));
};

	return (
		<Modal isOpen={isOpen} onClose={onClose} >
			<ModalOverlay />
			<ModalContent bg="brand.900" borderRadius="2xl" >
				<ModalHeader textAlign="center" color="white">Settings</ModalHeader>
				<ModalBody>
					<SlidersContainer sliders={settings.sliders} onSliderChange={handleSliderChange} />
					<Select color={"brand.300"} value={settings.cardVision} onChange={handleCardVisionChange}>
                        <option value="BotView">BotView</option>
                        <option value="GodMode">GodMode</option>
                        <option value="Hidden">Hidden</option>
                    </Select>
					<ButtonsContainer getGameState={getGameState} buttons={settings.buttons} onButtonChange={handleButtonChange}/>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}