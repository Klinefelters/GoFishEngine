import ButtonComponent from "./ButtonComponent"
import { Divider, Flex, Spacer } from "@chakra-ui/react";

export default function ButtonsContainer ({ buttons, onButtonChange }) {
    return (
      <Flex >
        <Spacer />
        {Object.values(buttons).map((button, index) => (
            <>
          <ButtonComponent key={index} button={button} onChange={onButtonChange} />
          <Spacer />
          </>
        ))}
      </Flex>
    );
  };