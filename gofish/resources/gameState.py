from gofish.resources.card import Card
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
        hands (List[Hand]): The list of hands for each player in the game.
        publicHands (List[Hand]): The list of public hands for each player in the game.
        pool (Pool): The pool of cards that are not yet drawn in the game.
        books (List[Book]): The list of books formed by players in the game.
        currentSeat (int): The index of the player who is currently taking their turn.

    Methods:
        getPlayerState(player_index: int) -> PlayerState: Returns a version of the game state from the perspective of the specified player, with private information hidden.
        getDict() -> dict: Returns a dictionary representation of the Game State.
    """
    hands: List[Hand] = Factory(list)
    publicHands: List[Hand] = Factory(list)
    pool: Pool = Factory(Pool)
    books: List[Book] = Factory(list)
    currentSeat: int = 0

    def getPlayerState(self, player_index: int) -> PlayerState:
        """
        Get the state from the view of a specified player.

        Args:
            player_index (int): The index of the player.

        Returns:
            PlayerState: The state of the game from the perspective of the specified player, with private information hidden.
        """
        allRanks = [card.rank for card in self.hands[player_index].cards.copy()]
        hidden_state = PlayerState(
            hand=Hand(self.hands[player_index].cards.copy()),  # Copy the Hand
            validRanks=list(set(allRanks)),
            validTargets=[i for i in range(
                len(self.hands)) if ((i != player_index) and (len(self.hands[i].cards) > 0))],
            publicHands=self.publicHands.copy(),  # Copy the public information
            pool=len(self.pool.cards),  # Send Empty Pool
            books=self.books.copy(),  # Copy the books
            currentSeat=player_index
        )

        # Fill each public hand with cards of rank "" and suit "" until the length matches the corresponding hand
        for i, public_hand in enumerate(hidden_state.publicHands):
            while len(public_hand.cards) < len(self.hands[i].cards):
                public_hand.cards.append(Card(rank="", suit=""))

        return hidden_state

    def getDict(self) -> dict:
        """
        Retrieve a dictionary representation of the Game State.

        Returns:
            dict: The current state of the game as a dictionary.
        """
        return asdict(self)
