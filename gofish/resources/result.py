from gofish.resources.response import Response
from attr import define, Factory, asdict
from typing import List


@define
class Result:
    """
    Represents the result of a round in the game.

    Attributes:
    - responses (List[Response]): The list of responses from players.

    Methods:
    - getDict() -> dict: Returns a dictionary representation of the Result.
    - checkBust() -> bool: Checks if all lists of cards from players are empty.
    """
    responses: List[Response] = Factory(list)

    def getDict(self) -> dict:
        """
        Retrieve a dictionary representation of the Result.

        Returns:
        - dict: the result object as a dictionary
        """
        return asdict(self)

    def checkBust(self) -> bool:
        """
        Checks if all lists of cards from players are empty.

        Returns:
        bool: True if all lists are empty, False otherwise.
        """
        return all(not response.cards for response in self.responses)
