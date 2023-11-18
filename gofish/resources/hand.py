from gofish.resources.card import Card
from gofish.resources.book import Book
from collections import Counter
from attr import define, Factory
from typing import List


@define
class Hand:
    """
    Represents a player's hand of cards.

    Attributes:
    - cards (List[Card]): The list of cards in the hand.

    Methods:
    - pullRanks(rank: str) -> List[Card]: Find all cards of a given rank and pull them from the hand.
    - pullBooks(rank: str) -> List[Books]: Find all books and pull them from the hand.
    """
    cards: List[Card] = Factory(list)

    def pullRanks(self, rank: str) -> List[Card]:
        """
        Find all cards of a given rank in the hand and remove them from the hand.

        Parameters:
        - rank (str): The rank of the cards to be pulled.

        Returns:
        List[Card]: The list of cards with the specified rank that were pulled from the hand.
        """
        found = [card for card in self.cards if card.rank == rank]
        self.cards = [card for card in self.cards if card.rank != rank]
        return found

    def pullBooks(self, player: int) -> List[Book]:
        """
        Find all books of in the players hand.

        Parameters:
        - player (int): The seat of the player's hand. This will mark all of the books for scoring

        Returns:
        List[Book]: The list of books pulled from the hand.
        """
        books = []

        for rank in set(card.rank for card in self.cards):
            count = 0
            book = Book(player, rank)
            for card in self.cards:
                if card.rank == rank:
                    book.cards.append(card)
                    count += 1
                    if count == 4:
                        [self.cards.remove(card) for card in book.cards]
                        books.append(book)

        return books

    def getMostCommonRank(self):
        """
        Get the most common rank in the hand

        Returns:
            str: rank of the most common rank in the hand
        """
        return Counter([card.rank for card in self.cards]).most_common(1)[0][0]
