import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "super-secret-key")
    
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:root@localhost:5432/Flask"
    
    SQLALCHEMY_BINDS = {
        'mysql': "mysql+pymysql://root:@localhost:3306/Flask"
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = 'uploads'
    OUTPUT_FOLDER = 'outputs'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  


