from gofish.player import Player
from gofish.resources import PlayerState, Hand
from random import choice


class TestPlayer(Player):
    def takeTurn(self, state: PlayerState) -> str:

        knownHand = Hand([card for card in state.hand.cards])

        for seat, hand in enumerate(state.publicHands):
            if seat != state.currentSeat:
                [knownHand.cards.append(card) for card in hand.cards]

        books = knownHand.pullBooks(state.currentSeat)

        if books:
            for book in books:
                if book.rank in state.validRanks:
                    return book.rank

        return choice(state.validRanks)
