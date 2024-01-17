from gofish.player import Player
from gofish.resources import PlayerState, Hand
from typing import Union
from random import choice


class TestPlayer(Player):
    def takeTurn(self, state: PlayerState) -> Union[str, int]:
        chosen_rank = choice(state.validRanks)
        chosen_target = choice(state.validTargets)
        hands = state.publicHands
        hands[state.currentSeat] = state.hand

        combined = Hand()

        for hand in hands:
            for card in hand.cards:
                combined.cards.append(card)

        possible_books = combined.pullBooks(0)
        break_var = False

        for book in possible_books:
            if break_var:
                break
            if book.rank in state.validRanks:
                chosen_rank = book.rank

                for i, hand in enumerate(state.publicHands):
                    if i in state.validTargets and hand.pullRanks(chosen_rank):
                        chosen_target = i
                        print("book claimed")
                        break_var = True
                        break

        return chosen_rank, chosen_target
