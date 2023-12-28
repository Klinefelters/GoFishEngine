from gofish.resources.request import Request
from gofish.resources.response import Response
from gofish.resources.card import Card
from gofish.resources.book import Book
from attr import define, Factory, asdict
from typing import List, Union


@define
class TurnSummary:
    """
    Represents the summary of a single turn in the game.

    Attributes:
        seat (int): The index of the player who took the turn.
        request (Request): The request made by the player.
        response (Response): The response to the player's request.
        drawn (Union[bool, Card]): The card drawn by the player, or False if no card was drawn.
        books (List[Book]): The list of new books laid down during the turn.
        busted (bool): True if the player busted during the turn, False otherwise.

    Methods:
        getDict() -> dict: Returns a dictionary representation of the TurnSummary.
    """
    seat: int
    request: Request
    response: Response = Factory(Response)
    drawn: Union[bool, Card] = False
    books: List[Book] = Factory(list)
    busted: bool = False

    def getDict(self) -> dict:
        """
        Retrieve a dictionary representation of the TurnSummary.

        Returns:
            dict: The summary of the turn as a dictionary.
        """
        return asdict(self)
