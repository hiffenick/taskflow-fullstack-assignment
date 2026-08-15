from flask import Flask
from flask_cors import CORS

from .routes.home import main
from .routes.task import tasks


def create_app():
    app = Flask(__name__)

    CORS(app)
    app.register_blueprint(main)
    app.register_blueprint(tasks)

    return app