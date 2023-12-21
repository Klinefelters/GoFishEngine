import ButtonComponent from "./ButtonComponent"
import { Box, Flex, Spacer } from "@chakra-ui/react";

export default function ButtonsContainer ({ buttons, onButtonChange }) {
    return (
      <Flex >
        <Spacer />
        {Object.values(buttons).map((button, index) => (
          <ButtonComponent key={index} button={button} onChange={onButtonChange} />
        ))}
        <Spacer />
      </Flex>
    );
  };