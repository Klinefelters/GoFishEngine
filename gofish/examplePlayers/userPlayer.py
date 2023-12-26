from typing import Union
from gofish.player import Player
from gofish.resources import PlayerState
from typing import Union


class UserPlayer(Player):
    def takeTurn(self, state: PlayerState) -> Union[str, int]:
        print(state.getDict())
        print(state.getTensor())
        return input("Enter the rank you want to request: "), int(input("Enter the target you want to request: "))
