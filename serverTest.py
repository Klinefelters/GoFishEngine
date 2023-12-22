from gofish.api import genApp
from gofish import Engine
from examplePlayers.randPlayer import RandPlayer
# from logging import DEBUG

engine = Engine(
    players=[
        RandPlayer("Random 1"),
        RandPlayer("Random 2"),
        RandPlayer("Random 3"),
        RandPlayer("Random 4"),
        # RandPlayer("Random 5"),
        # RandPlayer("Random 6"),
        # RandPlayer("Random 7"),
    ],
    # logLevel=DEBUG
)

app = genApp(engine)

app.run(host="0.0.0.0", port=8000, debug=True, )
