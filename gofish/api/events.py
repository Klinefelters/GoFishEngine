from flask import Blueprint, jsonify, request
from gofish.engine import Engine


def genBlueprint(engine: Engine) -> Blueprint:
    events_bp = Blueprint('events', __name__)

    @events_bp.route('/getRound', methods=['POST'])
    def getRound():
        data = request.get_json()
        # Handle data here...
        try:
            tmp = next(engine.yieldGame())
            message = tmp.getDict()
            print(message['busted'])
        except StopIteration:
            message = {"seat": -1}

        return jsonify(message)

    return events_bp
