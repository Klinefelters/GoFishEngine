"""
This module provides access to the resources for the Go Fish game.

Available Resources:
    SUITS: A list of the suits in a deck of cards.
    RANKS: A list of the ranks in a deck of cards.
    Card: A class representing a playing card.
    Book: A class representing a book of cards.
    Hand: A class representing a player's hand of cards.
    Pool: A class representing the pool of undrawn cards.
    Request: A class representing a player's request for a card.
    Response: A class representing a player's response to a request.
    TurnSummary: A class representing a summary of a turn.
    PlayerState: A class representing the state of a player.
    GameState: A class representing the state of the game.
"""

from gofish.resources.constants import SUITS, RANKS
from gofish.resources.card import Card
from gofish.resources.book import Book
from gofish.resources.hand import Hand
from gofish.resources.pool import Pool
from gofish.resources.request import Request
from gofish.resources.response import Response
from gofish.resources.turnSummary import TurnSummary
from gofish.resources.playerState import PlayerState
from gofish.resources.gameState import GameState

__all__ = ["SUITS", "RANKS", "Card", "Book", "Hand", "Pool", "Request",
           "Response", "TurnSummary", "PlayerState", "GameState"]
