from gofish.resources import PlayerState
from typing import Union


class Player:
    def __init__(self, name: str) -> None:
        """
        Initialize a new player with the given name. This function is not to
        be overwritten when inherited!

        Parameters:
            name (str): The name of the player.
        """
        self.name = name

    def initialize(self) -> None:
        """
        Initialize the player.

        This function is intended for users to declare variables or perform any
        setup actions if needed.
        """
        pass

    def reset(self) -> None:
        """
        Reset the player.

        This function is intended for users to rest any counters between games.
        The engine will call this after every game when evaluating.
        """
        pass

    def takeTurn(self, state: PlayerState) -> Union[str, int]:
        """
        Perform the player's turn.

        This function is called every turn the player has. The player should
        implement their strategy for taking a turn, including deciding which
        rank of card to request.

        Parameters:
            state (PlayerState): The current state of the game for the player.

        Returns:
        str: The rank of the card the player requests.
        int: The target of the seat the player requests.


        Raises:
        NotImplementedError: This function must be implemented by subclasses.
        """
        raise NotImplementedError("The takeTurn function must be implemented!")
