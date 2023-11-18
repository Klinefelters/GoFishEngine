from gofish.resources.card import Card
from attr import define, Factory
from typing import List


@define
class Book:
    """
    Represents a book of cards in the game.

    Attributes:
    - player (int): The seat number of the owner.
    - cards (List[Card]): The list of cards in the book.
    """
    player: int
    rank: str
    cards: List[Card] = Factory(list)
