from flask import Blueprint, jsonify, request
# from gofish.engine import Engine


def genBlueprint(engine) -> Blueprint:
    events_bp = Blueprint('events', __name__)

    @events_bp.route('/playRound', methods=['POST'])
    def playRound():
        data = request.get_json()
        # Handle data here...
        try:
            tmp = next(engine.yieldGame())
            message = tmp.getDict()
        except StopIteration:
            message = {"seat": -1}
            engine.reset()

        return jsonify(message)

    @events_bp.route('/getGameState', methods=['POST'])
    def getGameState():
        data = request.get_json()
        # Handle data here...
        return jsonify(engine.gameState.getDict())

    @events_bp.route('/resetGame', methods=['POST'])
    def resetGame():
        data = request.get_json()
        # Handle data here...
        engine.reset()
        return jsonify(engine.gameState.getDict())

    return events_bp
