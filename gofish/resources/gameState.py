from gofish.resources.hand import Hand
from gofish.resources.pool import Pool
from gofish.resources.book import Book
from gofish.resources.playerState import PlayerState
from attr import define, Factory, asdict
from typing import List


@define
class GameState:
    """
    Represents the state of the game.

    Attributes:
    - hands (List[Hand]): The list of hands in the game.
    - publicHands (List[Hand]): The list of public hands in the game.
    - pool (Pool): The pool of cards in the game.
    - books (List[Book]): The list of books formed in the game.
    - currentSeat (int): The index of the current player.

    Methods:
    - getPlayerState(player_index: int) -> PlayerState: Returns a version of the game state with private information hidden.
    - getDict() -> dict: Returns a dictionary representation of the Game State.
    """
    hands: List[Hand] = Factory(list)
    publicHands: List[Hand] = Factory(list)
    pool: Pool = Factory(Pool)
    books: List[Book] = Factory(list)
    currentSeat: int = 0

    def getPlayerState(self, player_index: int) -> PlayerState:
        """
        Get the state from the view of a specified player

        Returns:
        - PlayerState: The state of the game with hidden private information
        """
        allRanks = [card.rank for card in self.hands[player_index].cards.copy()]
        hidden_state = PlayerState(
            hand=Hand(self.hands[player_index].cards.copy()),  # Copy the Hand
            validRanks=list(set(allRanks)),
            validTargets=[i for i in range(
                len(self.hands)) if i != player_index],
            publicHands=self.publicHands.copy(),  # Copy the public information
            pool=len(self.pool.cards),  # Send Empty Pool
            books=self.books.copy(),  # Copy the books
            currentSeat=player_index
        )

        return hidden_state

    def getDict(self) -> dict:
        """
        Retrieve a dictionary representation of the Game State.

        Returns:
        - dict: The current state of the game as a dictionary
        """
        return asdict(self)
