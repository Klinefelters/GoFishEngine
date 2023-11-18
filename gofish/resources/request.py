from attr import define, asdict


@define
class Request:
    """
    Represents a request made by a player in the game.

    Attributes:
    - player (int): The index of the player making the request.
    - rank (str): The rank of the requested card.

    Methods:
    - getDict() -> dict: Returns a dictionary representation of the Request.
    """
    player: int
    rank: str = None

    def getDict(self) -> dict:
        """
        Retrieve a dictionary representation of the Request.

        Returns:
        - dict: The Request as a dictionary
        """
        return asdict(self)