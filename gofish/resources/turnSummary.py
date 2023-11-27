from gofish.resources.request import Request
from gofish.resources.response import Response
from gofish.resources.card import Card
from gofish.resources.book import Book
from attr import define, Factory, asdict
from typing import List


@define
class TurnSummary:
    """
    Represents the summary of a single turn.

    Attributes:
    - request (List[Request]): The list of requests made by players.
    - response (Response): The list of results from each round.
    - drawn (bool | Card): The list of draw results
    - busted (bool): True if the player busted, false otherwise.
    - books (list[Book]): The list of new books layed down
    """
    seat: int
    request: Request
    response: Response = Factory(Response)
    drawn: bool | Card = False
    books: List[Book] = Factory(list)
    busted: bool = True

    def getDict(self) -> dict:
        """
        Retrieve a dictionary representation of the TurnSummary.

        Returns:
        - dict: the summary of the turn as a dictionary
        """
        return asdict(self)
