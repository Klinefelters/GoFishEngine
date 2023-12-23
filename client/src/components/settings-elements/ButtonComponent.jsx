import { Button } from '@chakra-ui/react';

export default function ButtpnComponent ({ button, onChange }) {
    const { val, trueLabel, falseLabel, falseColor, trueColor, ref } = button;
  
    return (
        <Button p={4} onClick={(event) => onChange(!val, ref)} colorScheme={val? trueColor:falseColor}>
            {val? trueLabel:falseLabel}
        </Button>
    );
  };

