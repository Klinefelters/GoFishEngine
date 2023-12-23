from gofish import Engine
from gofish.examplePlayers import RandPlayer
# from examplePlayers.userPlayer import UserPlayer
from logging import INFO    # DEBUG


def main() -> None:
    engine = Engine(
        players=[
            RandPlayer("Random 0"),
            RandPlayer("Random 1"),
            # RandPlayer("Random 2"),
            # RandPlayer("Random 3"),
            # RandPlayer("Random 4"),
            # RandPlayer("Random 5"),
            # RandPlayer("Random 6"),
        ],
        logLevel=INFO)

    # engine.playGame()
    engine.serveGame()
    # print(engine.evaluatePlayers(runs=1000))
    # while True:
    #     try:
    #         summary = next(engine.yieldGame())
    #         print(summary.getDict())
    #         input()
    #     except StopIteration:
    #         break


if __name__ == "__main__":
    main()
