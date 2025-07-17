CREATE TABLE users (
  user_id        SERIAL PRIMARY KEY,
  first_name     VARCHAR(50)  NOT NULL,
  last_name      VARCHAR(50)  NOT NULL,
  email          VARCHAR(255) NOT NULL UNIQUE,
  username       VARCHAR(50)  NOT NULL UNIQUE,
  password_hash  TEXT         NOT NULL,
  mobile_number  VARCHAR(20),
  created_at     TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMP    NOT NULL DEFAULT NOW()
);
CREATE TABLE predictions (
  prediction_id     SERIAL PRIMARY KEY,
  user_id           INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  input_file_name   TEXT NOT NULL,
  input_uploaded_at TIMESTAMP DEFAULT NOW(),
  input_start       DATE NOT NULL,
  input_end         DATE NOT NULL,
  predicted_until   DATE NOT NULL,
  prediction_result JSONB NOT NULL,
  output_file_name  TEXT
);
-- a user for testing
INSERT INTO users (
  first_name, last_name, email, username, password_hash, mobile_number, created_at, updated_at
) VALUES (
  'Smira', 
  'Anis', 
  'smiraanis45@gmail.com', 
  'esc_909', 
  'scrypt:32768:8:1$GKbTeWYLT68lTCZk$07122e3b88b6f288a9a6196afeab3514b2d30e1a136beabb92070685afcbf563a310724ceb5b4a86c5ee634d017425a9920b35ded662625fb7a5cfb1a4e28e27', 
  '+21394610029', 
  NOW(), 
  NOW()
);
--password "anissm 2003"
