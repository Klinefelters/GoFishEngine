from gofish.resources.card import Card
from gofish.resources.constants import SUITS, RANKS
from random import shuffle
from attr import define, Factory
from typing import List


@define
class Pool:
    """
    Represents a pool of cards in the game.

    Attributes:
    - cards (List[Card]): The list of cards in the pool.

    Methods:
    - generate() -> None: Generate all cards in the pool and shuffle them.
    """
    cards: List[Card] = Factory(list)

    def generate(self) -> None:
        """
        Generates all of the cards in a standard deck to populate the pool.
        Shuffles them after generation
        """
        tmp = []
        for suit in SUITS:
            for rank in RANKS:
                tmp.append(Card(rank=rank, suit=suit))
        shuffle(tmp)
        self.cards = tmp
