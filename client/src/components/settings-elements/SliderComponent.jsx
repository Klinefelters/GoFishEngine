import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text } from '@chakra-ui/react';

export default function SliderComponent ({ slider, onChange }) {
    const { val, min, max, step, label, ref } = slider;
  
    return (
      <Box p={2}>
        <Text mb={2} color="white">{label}: {val}</Text>
        <Slider
          value={val}
          min={min}
          max={max}
          step={step}
          onChange={(value) => onChange(value, ref)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </Box>
    );
  };

