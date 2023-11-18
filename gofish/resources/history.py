from gofish.resources.request import Request
from gofish.resources.result import Result
from gofish.resources.card import Card
from attr import define, Factory, asdict
from typing import List


@define
class History:
    """
    Represents the history of requests and results in the game.

    Attributes:
    - requests (List[Request]): The list of requests made by players.
    - results (List[Result]): The list of results from each round.
    - draws (List[bool | Card]): The list of draw results
    """
    requests: List[Request] = Factory(list)
    results: List[Result] = Factory(list)
    draws: List[bool | Card] = Factory(list)
