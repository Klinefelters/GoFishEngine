from gofish import Engine
from gofish.examplePlayers import TorchPlayer, RandPlayer
from gofish.resources import RANKS
from logging import WARNING    # DEBUG
from torch.optim import Adam
from progress.bar import Bar


def train(episodes: int = 100, evals: int = 10, name: str = "torch", numPlayers: int = 2) -> None:
    if numPlayers < 2 or numPlayers > 7:
        raise ValueError("numPlayers must be between 2 and 7")
    torchPlayer = TorchPlayer(numPlayers)
    otherPlayers = [RandPlayer("rand") for _ in range(numPlayers-1)]
    players = [torchPlayer] + otherPlayers
    optimizer = Adam(torchPlayer.model.parameters())
    engine = Engine(players=players, logLevel=WARNING)
    print("Evaluating...")
    results = engine.evaluatePlayers(runs=evals)
    print(f"TorchPlayer won {round(results[0]*100, 2)}% of the books")
    bar = Bar('Training', max=episodes,
              suffix='%(index)d/%(max)d (%(percent).1f%%) - [ %(elapsed)ds : %(eta)ds ]')
    for _ in range(episodes):
        engine.reset()
        while True:
            try:
                gameState = engine.gameState
                summary = next(engine.yieldGame())
                if summary.seat == 0 and summary.request.rank is not None:
                    state = gameState.getPlayerState(summary.seat).getTensor()
                    action = RANKS.index(
                        summary.request.rank), summary.request.target
                    reward = .3 * len(summary.response.cards) + \
                        2 * len(summary.books)
                    next_state = engine.gameState.getPlayerState(
                        summary.seat).getTensor()
                    target_q_value = reward + \
                        (.99 * torchPlayer.model(next_state)[0].max().item())
                    index, _ = action
                    predicted_q_value = torchPlayer.model(state)[0][index]
                    loss = (predicted_q_value - target_q_value).pow(2)
                    optimizer.zero_grad()
                    loss.backward()
                    optimizer.step()

            except StopIteration:
                bar.next()
                break

    bar.finish()
    print("Evaluating...")
    results = engine.evaluatePlayers(runs=evals)
    print(f"TorchPlayer won {round(results[0]*100, 2)}% of the books")
    torchPlayer.model.save_weights(f"{name}.pt")
    print(f"Weights saved as {name}.pt")


if __name__ == "__main__":
    train(episodes=50000, evals=500, name="test", numPlayers=2)
