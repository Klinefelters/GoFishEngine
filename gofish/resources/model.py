import torch
from torch import nn


class GoFishModel(nn.Module):
    def __init__(self, num_public_hands: int):
        super(GoFishModel, self).__init__()

        # Define the layers of the model
        self.fc1 = nn.Linear(14*num_public_hands + 28 + 2, 128)  # Input layer
        self.fc2 = nn.Linear(128, 64)  # Hidden layer
        self.rank_output = nn.Linear(64, 14)  # Output layer for rank
        self.target_output = nn.Linear(
            64, num_public_hands)  # Output layer for target

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))

        # Compute the output for rank and target
        rank_output = self.rank_output(x)
        target_output = self.target_output(x)

        return rank_output, target_output