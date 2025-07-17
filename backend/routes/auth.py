import jwt
import datetime
from flask import Blueprint, request, jsonify, make_response, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
from database import db

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    hashed_pw = generate_password_hash(data['password'])

    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        username=data['username'],
        password_hash=hashed_pw,
        mobile_number=data.get('mobile_number')
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password_hash, data['password']):
        # Create JWT token
        token = jwt.encode({
        'user_id': user.user_id,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=6)
            }, current_app.secret_key, algorithm="HS256")

        # Return token as cookie
        response = make_response(jsonify({
            "message": "Login successful",
            "user_id": user.user_id
        }))
        response.set_cookie("token", token, httponly=True, samesite='Lax')  # Secure in production

        return response, 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


@auth_bp.route("/me", methods=["GET"])
def get_user_info():
    token = request.cookies.get("token")

    if not token:
        return jsonify({"message": "Not authenticated"}), 401

    try:
        data = jwt.decode(token, current_app.secret_key, algorithms=["HS256"])
        user = User.query.get(data["user_id"])

        return jsonify({
            "user_id": user.user_id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "username": user.username
        }), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Session expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

@auth_bp.route("/logout", methods=["POST"])
def logout():
    response = make_response(jsonify({"message": "Logged out successfully"}))
    response.set_cookie("token", "", expires=0)  # Clear the token cookie
    return response, 200