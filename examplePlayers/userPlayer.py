from gofish.player import Player
from gofish.resources import PlayerState
from random import choice


class UserPlayer(Player):
    def takeTurn(self, state: PlayerState) -> str:
        print(state.getDict())
        return input("Enter the rank you want to request: ")
