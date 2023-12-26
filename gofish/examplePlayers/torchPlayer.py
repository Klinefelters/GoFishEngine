from gofish.resources import PlayerState, RANKS
from gofish import GoFishModel, Player
from typing import Union
from torch import softmax, argmax


class TorchPlayer(Player):
    def __init__(self, num_public_hands: int, name: str = "TorchPlayer"):
        super(TorchPlayer, self).__init__(name)
        self.model = GoFishModel(num_public_hands)

    def takeTurn(self, state: PlayerState) -> Union[str, int]:
        # Convert the state to a tensor
        state_tensor = state.getTensor()

        # Use the model to predict the rank and target
        rank_output, target_output = self.model(state_tensor)

        # Convert the outputs to probabilities
        rank_probs = softmax(rank_output, dim=0)
        target_probs = softmax(target_output, dim=0)
        rank_probs[13] = 0

        # Choose the rank and target with the highest probability
        rank = argmax(rank_probs).item()
        target = argmax(target_probs).item()

        # Ensure that the chosen rank is in the player's hand
        while RANKS[rank] not in state.validRanks:
            rank_probs[rank] = -1
            rank = argmax(rank_probs).item()

        # Ensure that the chosen target is not the player themselves
        while target == state.currentSeat:
            target_probs[target] = 0
            target = argmax(target_probs).item()

        return RANKS[rank], target
