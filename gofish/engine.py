from gofish.player import Player
from gofish.resources import *
from typing import Iterator
from time import perf_counter
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
        turn_start = perf_counter()
        tmpState = self.gameState.getPlayerState(seat)
        if len(tmpState.validRanks) < 1:
            try:
                drawn = self.gameState.pool.cards.pop(0)
                self.gameState.hands[seat].cards.append(drawn)
                tmpState = self.gameState.getPlayerState(seat)
            except IndexError:
                summary = TurnSummary(seat, Request(seat, seat))
                return summary
        check_cards = perf_counter()
        rank, target = player.takeTurn(state=tmpState)
        player_turn = perf_counter()
        if rank not in tmpState.validRanks:
            logging.critical(
                f"Player at seat {seat} asked for rank {rank} " +
                "which they don't own. Please check that players code."
            )
            raise ValueError(
                "A player attempted to cheat, see logs for more details")

        request = Request(player=seat, target=target, rank=rank)
        validate = perf_counter()

        found = self.gameState.hands[target].pullRanks(rank)
        pull_ranks = perf_counter()

        response = Response(player=target, cards=found)
        for card in found:
            self.gameState.hands[seat].cards.append(card)

        add_cards = perf_counter()
        target_hand = self.gameState.publicHands[target]
        seat_hand = self.gameState.publicHands[seat]

        # Use a list comprehension to filter out cards with the specified rank from the target hand
        cards_to_move = [
            card for card in target_hand.cards if card.rank == rank]

        # Remove the filtered cards from the target hand
        target_hand.cards = [
            card for card in target_hand.cards if card.rank != rank]

        # Append the filtered cards to the seat hand
        seat_hand.cards.extend(cards_to_move)

        # Append a new card to the seat hand
        seat_hand.cards.append(Card(rank, "?"))

        public_hands = perf_counter()

        drawn = False
        busted = False

        if response.checkBust():
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
        checking_bust = perf_counter()
        books = self.gameState.hands[seat].pullBooks(seat)
        for book in books:
            for hand in self.gameState.publicHands:
                hand.cards = [card for card in hand.cards if card.rank != book.rank]

        [self.gameState.books.append(book) for book in books]
        checking_books = perf_counter()
        [logging.info(f"Player {book.player} layed down {book.rank}")
         for book in books]
        summary = TurnSummary(
            seat=seat,
            request=request,
            response=response,
            drawn=drawn,
            books=books,
            busted=busted
        )

        logging.debug(f"Request: {summary.request.getDict()}")
        logging.debug(f"Result: {summary.response.getDict()}")
        logging.debug(f"Draw: {summary.drawn}")
        logging.debug(f"Busted: {summary.busted}")
        logging.debug(f"Books: {summary.books}")
        returning = perf_counter()
        logging.debug(f"Check Cards (ns)   : {check_cards-turn_start}")
        logging.debug(f"Player Turn (ns)   : {player_turn-check_cards}")
        logging.debug(f"Validate (ns)      : {validate-player_turn}")
        logging.debug(f"Pull Ranks (ns)    : {pull_ranks-validate}")
        logging.debug(f"Add Cards (ns)     : {add_cards-pull_ranks}")
        logging.debug(f"Public Hands (ns)  : {public_hands-add_cards}")
        logging.debug(f"Checking Bust (ns) : {checking_bust-public_hands}")
        logging.debug(f"Checking Books (ns): {checking_books-checking_bust}")
        logging.debug(f"Returning (ns)     : {returning-checking_books}")
        logging.debug(f"Total (ns)         : {returning-turn_start}")
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
            currentSeat=0
        )
        self.deal()
