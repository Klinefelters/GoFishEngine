from gofish import Engine
from gofish.examplePlayers import RandPlayer
from testPlayer import TestPlayer
from logging import INFO    # DEBUG


def main() -> None:
    engine = Engine(
        players=[
            TestPlayer("Test"),
            RandPlayer("Random"),
            # Add up to 5 more players here
        ],
        logLevel=INFO)

    # engine.playGame()
    engine.serveGame()
    # print(engine.evaluatePlayers(runs=100))
    # while True:
    #     try:
    #         summary = next(engine.yieldGame())
    #         print(summary.getDict())
    #         input()
    #     except StopIteration:
    #         break


if __name__ == "__main__":
    main()
