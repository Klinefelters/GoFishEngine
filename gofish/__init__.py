"""
This module provides access to the main components of the Go Fish game.

Available Components:
    Engine: The game engine for a Go Fish card game.
    GoFishModel: The model for a Go Fish card game.
    Player: The base class for a player in the Go Fish game.
    resources: The module containing resources for the Go Fish game.
    api: The module containing the application generation functions for the Go Fish game.
"""

from gofish.engine import Engine
from gofish.model import GoFishModel
from gofish.player import Player
from gofish import resources
from gofish import api

__all__ = ["Engine", "GoFishModel", "Player", "resources", "api"]
