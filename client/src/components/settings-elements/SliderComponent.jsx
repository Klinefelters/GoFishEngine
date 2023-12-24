import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, Flex } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons'

export default function SliderComponent ({ slider, onChange }) {
    const { val, reset, min, max, step, label, ref } = slider;

    const handleClick = () => {
        onChange(reset, ref);
    };
  
    return (
      <Box p={2}>
        <Flex justifyContent="space-between">
          <Text mb={2} color="white">{label}: {val}</Text>
          <RepeatIcon color="white" onClick={handleClick}/>
        </Flex>
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

