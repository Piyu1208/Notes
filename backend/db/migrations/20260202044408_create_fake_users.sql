-- migrate:up
INSERT INTO users (id, email, password_hash)
VALUES (gen_random_uuid(), 'mike@example.com', 'fafsgjnfgjs'),
       (gen_random_uuid(), 'jake@example.com', 'dvndjgjgdgj');

-- migrate:down

DELETE FROM users
WHERE email = 'mike@example.com';

DELETE FROM users
WHERE email = 'jake@example.com';

