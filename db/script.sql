CREATE DATABASE aposta
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE IF NOT EXISTS  usuarios (
	user_id serial PRIMARY KEY,
	username varchar(255) UNIQUE NOT NULL,
	password varchar NOT NULL, 
	email varchar(255) NOT NULL,
	name varchar(255),
	created_on timestamp,
	active bool,
	validated bool,
	role_id int NOT NULL,
	code varchar
);

CREATE TABLE IF NOT EXISTS ligas(
	liga_id serial PRIMARY KEY, 
	nombre varchar(255) NOT NULL, 
	logo varchar
)