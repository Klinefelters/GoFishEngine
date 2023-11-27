from typing import Union
from gofish.player import Player
from gofish.resources import PlayerState
from typing import Union
from random import choice


class RandPlayer(Player):
    def takeTurn(self, state: PlayerState) -> Union[str, int]:
        return choice(state.validRanks), choice(state.validTargets)
