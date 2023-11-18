from attr import define


@define
class Card:
    """
    Represents a playing card with a rank and suit.

    Attributes:
    - rank (str): The rank of the card, which can be "2"-"10", "J", "Q", "K", or "A".
    - suit (str): The suit of the card, which can be "Diamonds", "Hearts", "Spades", or "Clubs".
    """
    rank: str
    suit: str
