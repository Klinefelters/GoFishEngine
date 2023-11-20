import SliderComponent from "./SliderComponent";
import { Box } from "@chakra-ui/react";

export default function SlidersContainer ({ sliders, onSliderChange }) {
    return (
      <Box >
        {Object.values(sliders).map((slider, index) => (
          <SliderComponent key={index} slider={slider} onChange={onSliderChange} />
        ))}
      </Box>
    );
  };