from gofish.resources.card import Card
from attr import define, Factory
from typing import List


@define
class Book:
    """
    A class used to represent a book of cards in the game of Go Fish.

    Attributes:
        player (int): The seat number of the player who owns the book.
        rank (str): The rank of the cards in the book. All cards in a book have the same rank.
        cards (List[Card]): The list of Card objects in the book. Initialized as an empty list.
    """  # noqa: E501
    player: int
    rank: str
    cards: List[Card] = Factory(list)
