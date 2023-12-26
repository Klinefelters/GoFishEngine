from gofish.resources.hand import Hand
from gofish.resources.book import Book
from attr import define, Factory, asdict
from torch import tensor, zeros, cat, Tensor
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

    def getTensor(self) -> Tensor:
        """
        Retrieve a tensor representation of the PlayerState.

        Returns:
        - Tensor: The current state of the game as a tensor
        """
        # Convert hand to tensor
        hand_tensor = zeros(14)
        for card in self.hand.cards:
            if card.rank.isdigit():
                hand_tensor[int(card.rank) - 1] += 1
            elif card.rank == 'A':
                hand_tensor[0] += 1
            elif card.rank == 'J':
                hand_tensor[10] += 1
            elif card.rank == 'Q':
                hand_tensor[11] += 1
            elif card.rank == 'K':
                hand_tensor[12] += 1
            else:
                hand_tensor[13] += 1

        # Convert publicHands to tensor
        public_hands_tensor = zeros((len(self.publicHands), 14))
        for i, public_hand in enumerate(self.publicHands):
            for card in public_hand.cards:
                if card.rank.isdigit():
                    public_hands_tensor[i, int(card.rank) - 1] += 1
                elif card.rank == 'A':
                    public_hands_tensor[i, 0] += 1
                elif card.rank == 'J':
                    public_hands_tensor[i, 10] += 1
                elif card.rank == 'Q':
                    public_hands_tensor[i, 11] += 1
                elif card.rank == 'K':
                    public_hands_tensor[i, 12] += 1
                else:
                    public_hands_tensor[i, 13] += 1

        # Convert pool to tensor
        pool_tensor = tensor([self.pool])

        # Convert books to tensor
        books_tensor = zeros(14)
        for book in self.books:
            if book.rank.isdigit():
                books_tensor[int(book.rank) - 1] += 1
            elif book.rank == 'A':
                books_tensor[0] += 1
            elif book.rank == 'J':
                books_tensor[10] += 1
            elif book.rank == 'Q':
                books_tensor[11] += 1
            elif book.rank == 'K':
                books_tensor[12] += 1

        # Convert currentSeat to tensor
        current_seat_tensor = tensor([self.currentSeat])

        # Concatenate all tensors
        state_tensor = cat((hand_tensor, public_hands_tensor.flatten(
        ), books_tensor, pool_tensor, current_seat_tensor))

        return state_tensor
