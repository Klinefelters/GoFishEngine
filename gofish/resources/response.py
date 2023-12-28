from gofish.resources.card import Card
from attr import define, Factory, asdict
from typing import List


@define
class Response:
    """
    Represents a response to a request in the game.

    Attributes:
        player (int): The index of the player responding.
        cards (List[Card]): The list of cards provided in response.

    Methods:
        getDict() -> dict: Returns a dictionary representation of the Response.
        checkBust() -> bool: Checks if all lists of cards from players are empty.
    """
    player: int = 0
    cards: List[Card] = Factory(list)

    def getDict(self) -> dict:
        """
        Retrieve a dictionary representation of the Response.

        Returns:
            dict: The Response as a dictionary.
        """
        return asdict(self)

    def checkBust(self) -> bool:
        """
        Checks if all lists of cards from players are empty.

        Returns:
            bool: True if all lists are empty, False otherwise.
        """
        return not self.cards
