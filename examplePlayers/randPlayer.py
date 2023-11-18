from gofish.player import Player
from gofish.resources import PlayerState
from random import choice


class RandPlayer(Player):
    def takeTurn(self, state: PlayerState) -> str:
        return choice(state.validRanks)
