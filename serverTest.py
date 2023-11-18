from gofish.api import genApp
from gofish import Engine
from examplePlayers.randPlayer import RandPlayer

engine = Engine(
    players=[
        RandPlayer("Random"),
        RandPlayer("User"),
        # TestPlayer("Player2"),
        # TestPlayer("Player3"),
        # TestPlayer("Player4"),
        # TestPlayer("Player5"),
        # TestPlayer("Player6"),
    ]
)

app = genApp(engine)

app.run(host="0.0.0.0", port=8000, debug=True, )
