from gofish import Engine
from gofish.examplePlayers import RandPlayer
from logging import INFO, DEBUG


def main() -> None:
    engine = Engine(
        players=[
            RandPlayer("Random1"),
            RandPlayer("Random2"),
            RandPlayer("Random3"),
            RandPlayer("Random4"),
            RandPlayer("Random5"),
            RandPlayer("Random6"),
            RandPlayer("Random7"),
            # Must be 2-7 players
        ],
        logLevel=DEBUG)

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
