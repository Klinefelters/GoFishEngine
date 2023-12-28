from flask import Flask, render_template
from flask_cors import CORS
from gofish.api.events import genBlueprint


def genApp(engine) -> Flask:
    events_bp = genBlueprint(engine)
    app = Flask(__name__, static_url_path='', static_folder='static', template_folder='static')  # noqa
    CORS(app, resources={
         r"*": {"origins": ["http://localhost:5173", "http://localhost:8000",
                            "http://0.0.0.0:5173", "http://0.0.0.0:8000"]}})
    app.register_blueprint(events_bp)

    @app.route("/")
    def _():
        return render_template("index.html")
    return app
