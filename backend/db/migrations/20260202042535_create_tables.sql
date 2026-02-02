-- migrate:up
CREATE TYPE role AS ENUM ('admin', 'user');

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role ROLE DEFAULT 'user',
    created_at TIMESTAMP DEFAULT now()
);


CREATE TABLE notes (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    is_archived BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- migrate:down

DROP TABLE IF EXISTS notes;

DROP TABLE IF EXISTS users;

DROP TYPE IF EXISTS role;