import Hand from "./Hand";

export default function Pool  ({cards, size, settings}) {
		return (
			<Hand cards={cards} index={0} size={size} godMode={settings.cardVision ==="GodMode"? true:false} hidden={settings.cardVision ==="Hidden"? true:false}/>
		);
	};