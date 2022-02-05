DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tweets;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userName NOT NULL UNIQUE,
    displayName NOT NULL
);
-- INSERT INTO users (id, username, displayName)
-- VALUES
-- (1, 'Sekiyu19', 'Seki🐼'),

CREATE TABLE tweets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    content NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);
-- INSERT INTO tweets (id, userId, content)
-- VALUES
-- (1, '外が明るい'),