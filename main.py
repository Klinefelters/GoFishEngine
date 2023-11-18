from gofish import Engine
from examplePlayers.randPlayer import RandPlayer
from logging import DEBUG, INFO


def main() -> None:
    engine = Engine(
        players=[
            RandPlayer("Random"),
            RandPlayer("Random2"),
            # RandPlayer("Player2"),
            # RandPlayer("Player3"),
            # RandPlayer("Player4"),
            # RandPlayer("Player5"),
            # RandPlayer("Player6"),
        ],
        logLevel=INFO)

    # engine.playGame()
    # engine.evaluatePlayers(runs=100)
    for summary in engine.yieldGame():
        print(summary.getDict())
        input()


if __name__ == "__main__":
    main()
