from gofish.resources.card import Card
from attr import define, Factory
from typing import List


@define
class Response:
    """
    Represents a response to a request in the game.

    Attributes:
    - player (int): The index of the player responding.
    - cards (List[Card]): The list of cards provided in response.
    """
    player: int
    cards: List[Card] = Factory(list)
