from gofish.resources.hand import Hand
from gofish.resources.book import Book
from attr import define, Factory, asdict
from typing import List


@define(frozen=True)
class PlayerState:
    """
    Represents the state of a player in the game.

    Attributes:
    - hand (Hand): The player's hand.
    - validRanks (List[str]): The valid ranks that the player can request.
    - validTargets (List[int]): The valid seats that the player can target.
    - publicHands (List[Hand]): The list of public hands in the game.
    - pool (int): The number of cards in the pool.
    - books (List[Book]): The list of books the player has formed.
    - currentSeat (int): The index of the current player.

    Methods:
    - getDict() -> dict: Returns a dictionary representation of the Player State.
    """
    hand: Hand = Factory(Hand)
    validRanks: List[str] = Factory(list)
    validTargets: List[int] = Factory(list)
    publicHands: List[Hand] = Factory(list)
    pool: int = 0
    books: List[Book] = Factory(list)
    currentSeat: int = 0

    def getDict(self) -> dict:
        """
        Retrieve a dictionary representation of the Player State.

        Returns:
        - dict: The current state of the game as a dictionary
        """
        return asdict(self)
