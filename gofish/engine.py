from gofish.player import Player
from gofish.resources import *
from typing import Iterator
import logging


class Engine:
    """
    The game engine for a Go Fish card game.

    Attributes:
    - players (List[Player]): The list of players in the game.
    - numPlayers (int): The number of players in the game.
    - gameState (GameState): The current state of the game.

    Methods:
    - __init__(self, players: List[Player]) -> None: Initializes the game engine with the given players.

    - deal(self) -> None: Deals cards to the players at the start of the game.

    - playRound(self) -> None: Executes a round of the game where each player takes a turn.

    - broadcast(self, results: Result) -> None: Prints the results of the current round.
    """

    def __init__(self, players: list[Player], **kwargs) -> None:
        """
        Initializes the game engine with the given players.

        Parameters:
        - players (list[Player]): The list of players in the game.
        - logLevel (int) = INFO : The level of debugging. Constants from the logging module.
        - saveFile (str) = None : The name of the file for logs to be saved to. 

        Raises:
        - ValueError: If the number of players is less than 2 or greater than 7.
        """
        logging.basicConfig(
            level=kwargs.get('logLevel', logging.INFO),
            format="%(asctime)s | %(levelname)s: %(message)s",
            filename=kwargs.get('saveFile', None)
        )
        self.numPlayers = len(players)
        if self.numPlayers > 7:
            logging.critical("Too many players!")
            raise ValueError("Number of Players is too Large!")
        if self.numPlayers < 2:
            logging.critical("Too few players!")
            raise ValueError("Number of Players is too Small!")

        self.players = players
        [player.initialize() for player in self.players]
        pool = Pool(cards=[])
        pool.generate()
        self.gameState = GameState(
            hands=[Hand() for _ in self.players],
            publicHands=[Hand() for _ in self.players],
            pool=pool,
            books=[],
            history=History(),
            currentSeat=0
        )
        self.deal()

    def deal(self) -> None:
        """
        Deals cards to the players at the start of the game.

        The number of cards dealt depends on the number of players in the game.
        """
        if self.numPlayers == 2:
            n = 7
        else:
            n = 5
        for _ in range(n):
            for hand in self.gameState.hands:
                hand.cards.append(self.gameState.pool.cards.pop(0))

    def yieldGame(self) -> Iterator[TurnSummary]:
        """
        Yields the game engine as a generator of turn summaries.

        During a round, each player takes their turn, requests a card from other players,
        and collects any cards they receive. The results of each turn are printed.
        """
        while len(self.gameState.books) < 13:
            seat = self.gameState.currentSeat
            summary = self._playTurn(self.players[seat], seat)
            if summary.busted:
                self.gameState.currentSeat += 1
                if self.gameState.currentSeat > self.numPlayers - 1:
                    self.gameState.currentSeat = 0
            yield summary

    def playGame(self) -> None:
        """
        Starts the game engine.

        During a round, each player takes their turn, requests a card from other players,
        and collects any cards they receive. The results of each turn are printed.
        """
        while len(self.gameState.books) < 13:
            for i, player in enumerate(self.players):
                self.gameState.currentSeat = i

                while True:
                    summary = self._playTurn(player, i)
                    if summary.busted:
                        break

    def _playTurn(self, player: Player, seat: int) -> TurnSummary:
        """
        Plays a single turn and returns the summary of that turn.

        Args:
            player (Player): The player that will be taking the turn
            seat (int): The seat number where the player is sitting

        Returns:
            TurnSummary: A summary object of the turn. Check resources.
        """
        tmpState = self.gameState.getPlayerState(seat)
        if len(tmpState.validRanks) < 1:
            try:
                drawn = self.gameState.pool.cards.pop(0)
                self.gameState.hands[seat].cards.append(drawn)
                tmpState = self.gameState.getPlayerState(seat)
            except IndexError:
                summary = TurnSummary(seat, Request(seat))
                return summary

        rank = player.takeTurn(state=tmpState)

        if rank not in tmpState.validRanks:
            logging.critical(
                f"Player at seat {seat} asked for rank {rank} " +
                "which they don't own. Please check that players code."
            )
            raise ValueError(
                "A player attempted to cheat, see logs for more details")

        request = Request(player=seat, rank=rank)

        result = Result()

        for j, hand in enumerate(self.gameState.hands):
            if seat != j:
                found = hand.pullRanks(rank)
                response = Response(player=j, cards=found)
                for card in found:
                    self.gameState.hands[seat].cards.append(card)
                    for hand in self.gameState.publicHands:
                        for card in hand.cards:
                            if card.rank == rank:
                                hand.cards.remove(card)
                    self.gameState.publicHands[seat].cards.append(card)
                self.gameState.publicHands[seat].cards.append(Card(rank, "?"))
                result.responses.append(response)

        drawn = False
        busted = False

        if result.checkBust():
            try:
                drawn = self.gameState.pool.cards.pop(0)
                self.gameState.hands[seat].cards.append(drawn)
                if drawn.rank != rank:
                    busted = True
                    drawn = True
                else:
                    self.gameState.publicHands[seat].cards.append(drawn)
            except IndexError:
                busted = True

        books = self.gameState.hands[seat].pullBooks(seat)
        for book in books:
            for hand in self.gameState.publicHands:
                for card in hand.cards:
                    if book.rank == card.rank:
                        hand.cards.remove(card)

        [self.gameState.books.append(book) for book in books]
        [logging.info(f"Player {book.player} layed down {book.rank}")
         for book in books]

        self.gameState.history.requests.insert(0, request)
        self.gameState.history.results.insert(0, result)
        self.gameState.history.draws.insert(0, drawn)
        summary = TurnSummary(seat, request, result, drawn, books, busted)

        logging.debug(f"Request: {summary.request.getDict()}")
        logging.debug(f"Result: {summary.result.getDict()}")
        logging.debug(f"Draw: {summary.drawn}")
        logging.debug(f"Busted: {summary.busted}")
        logging.debug(f"Books: {summary.books}")

        return summary

    def evaluateGame(self) -> list[float]:
        """
        Evaluates the final game state to find the winner(s)

        Returns:
        - name(s) (list[str] | str): The name or list of names of the winners
        - numBooks (int): The number of books the winner laid down
        """
        count = [0 for _ in self.players]
        for book in self.gameState.books:
            count[book.player] += 1
        maxVal = max(count)
        winners = [i for i, n in enumerate(count) if n == maxVal]
        logging.info(f"Player(s) {winners} won with {maxVal} books")
        return count

    def evaluatePlayers(self, runs: int = 10) -> list[float]:
        """
        Evaluates the final game state to find the winner(s)

        Returns:
        - name(s) (list[str] | str): The name or list of names of the winners
        - numBooks (int): The number of books the winner laid down
        """
        totalBooks = len(RANKS) * runs
        booksScored = [0 for _ in self.players]

        for _ in range(runs):
            self.playGame()
            scores = self.evaluateGame()
            for i, score in enumerate(scores):
                booksScored[i] += score
            self.reset()

        return [float(score/totalBooks) for score in booksScored]

    def reset(self) -> None:
        [player.reset() for player in self.players]
        del (self.gameState)
        pool = Pool(cards=[])
        pool.generate()
        self.gameState = GameState(
            hands=[Hand() for _ in self.players],
            publicHands=[Hand() for _ in self.players],
            pool=pool,
            books=[],
            history=History(),
            currentSeat=0
        )
        self.deal()
