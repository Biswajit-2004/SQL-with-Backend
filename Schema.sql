CREATE TABLE user (
    Id INT ,
    username VARCHAR(100) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100)  NOT NULL
);
