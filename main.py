from gofish import Engine
from gofish.examplePlayers import RandPlayer
from logging import INFO    # DEBUG


def main() -> None:
    engine = Engine(
        players=[
            RandPlayer("Random 1"),
            RandPlayer("Random 1"),
            # Add up to 5 more players here
        ],
        logLevel=INFO)

    # engine.playGame()
    # engine.serveGame()
    print(engine.evaluatePlayers(runs=100))
    # while True:
    #     try:
    #         summary = next(engine.yieldGame())
    #         print(summary.getDict())
    #         input()
    #     except StopIteration:
    #         break


if __name__ == "__main__":
    main()
