from flask import Flask
from flask_cors import CORS
from gofish.api.events import genBlueprint
from gofish.engine import Engine


def genApp(engine: Engine) -> Flask:
    events_bp = genBlueprint(engine)
    app = Flask(__name__)
    CORS(app, resources={
         r"*": {"origins": ["http://localhost:5173", "http://localhost:8000",
                            "http://0.0.0.0:5173", "http://0.0.0.0:8000"]}})
    app.register_blueprint(events_bp)
    return app
