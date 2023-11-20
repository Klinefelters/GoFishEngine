from gofish.resources.hand import Hand
from gofish.resources.pool import Pool
from gofish.resources.book import Book
from gofish.resources.history import History
from attr import define, Factory, asdict
from typing import List


@define(frozen=True)
class PlayerState:
    """
    Represents the state of a player in the game.

    Attributes:
    - hand (Hand): The player's hand.
    - publicHands (List[Hand]): The list of public hands in the game.
    - pool (Pool): The pool of cards in the game.
    - books (List[Book]): The list of books the player has formed.
    - history (History): The history of requests and results for the player.
    - currentSeat (int): The index of the current player.

    Methods:
    - getDict() -> dict: Returns a dictionary representation of the Player State.
    """
    hand: Hand = Factory(Hand)
    validRanks: List[str] = Factory(list)
    publicHands: List[Hand] = Factory(list)
    pool: int = 0
    books: List[Book] = Factory(list)
    history: History = Factory(History)
    currentSeat: int = 0

    def getDict(self) -> dict:
        """
        Retrieve a dictionary representation of the Player State.

        Returns:
        - dict: The current state of the game as a dictionary
        """
        return asdict(self)
