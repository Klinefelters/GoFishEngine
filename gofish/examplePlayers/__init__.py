"""
This module provides access to different types of players for the Go Fish game.

Available Players:
    RandPlayer: A player that makes random moves.
    UserPlayer: A player that prompts the user to make moves.
    TorchPlayer: A player that uses a PyTorch model to make moves.
"""

from gofish.examplePlayers.randPlayer import RandPlayer
from gofish.examplePlayers.userPlayer import UserPlayer
from gofish.examplePlayers.torchPlayer import TorchPlayer

__all__ = ["RandPlayer", "UserPlayer", "TorchPlayer"]
