from torch import relu
from torch.nn import Module, Linear


class GoFishModel(Module):
    def __init__(self, num_players: int):
        super(GoFishModel, self).__init__()

        # Define the layers of the model
        self.fc1 = Linear(14*num_players + 28 + 2, 128)  # Input layer
        self.fc2 = Linear(128, 64)  # Hidden layer
        self.rank_output = Linear(64, 14)  # Output layer for rank
        self.target_output = Linear(
            64, num_players)  # Output layer for target

    def forward(self, x):
        x = relu(self.fc1(x))
        x = relu(self.fc2(x))

        # Compute the output for rank and target
        rank_output = self.rank_output(x)
        target_output = self.target_output(x)

        return rank_output, target_output
