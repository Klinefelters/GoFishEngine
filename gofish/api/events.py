from flask import Blueprint, jsonify, request


def genBlueprint(engine) -> Blueprint:
    events_bp = Blueprint('events', __name__)

    @events_bp.route('/playRound', methods=['POST'])
    def _playRound():
        data = request.get_json()
        # Handle data here...
        try:
            tmp = next(engine.yieldGame())
            message = tmp.getDict()
            message["counts"] = [0, 0]
        except StopIteration:
            counts = engine.evaluateGame()
            message = {"seat": -1, "counts": counts,
                       "names": [p.name for p in engine.players]}
            # engine.reset()

        return jsonify(message)

    @events_bp.route('/getGameState', methods=['POST'])
    def _getGameState():
        data = request.get_json()
        # Handle data here...
        return jsonify(engine.gameState.getDict())

    @events_bp.route('/resetGame', methods=['POST'])
    def _resetGame():
        data = request.get_json()
        # Handle data here...
        engine.reset()
        return jsonify(engine.gameState.getDict())

    return events_bp
