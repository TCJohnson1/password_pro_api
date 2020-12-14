CREATE DATABASE account;


CREATE TABLE account_user(
      userid BIGSERIAL PRIMARY KEY NOT NULL,
      first_name VARCHAR(200) NOT NULL,
      last_name VARCHAR(200) NOT NULL,
      email VARCHAR(200) NOT NULL,
      password VARCHAR(200) NOT NULL,
      unique(email)
);

CREATE TABLE TOKENS(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      access_token VARCHAR(500) NOT NULL,
      userid BIGSERIAL NOT NULL,
      FOREIGN KEY(userid) REFRENCES account_user(userid)
)