import ButtonComponent from "./ButtonComponent"
import { Flex, Spacer } from "@chakra-ui/react";
import ResetButton from "./ResetButton";

export default function ButtonsContainer ({ buttons, onButtonChange, getGameState }) {
    return (
      <Flex mt="10px">
        <Spacer />
        {Object.values(buttons).map((button, index) => (
          <ButtonComponent key={index} button={button} onChange={onButtonChange} />
        ))}
        <ResetButton getGameState={getGameState} />
        <Spacer />
      </Flex>
    );
  };