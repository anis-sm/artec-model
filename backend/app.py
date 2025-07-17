from flask import Flask
from flask_cors import CORS
from database import db
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    # Enable CORS with credentials for frontend on localhost:5173
    CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

    # Register Blueprints
    from routes.auth import auth_bp
    from routes.predict import predict_bp
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(predict_bp, url_prefix="/api")

    return app

# Run the app
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
