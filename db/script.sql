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
	logo varchar,
	active bool NOT NULL
)

CREATE TABLE IF NOT EXISTS temporadas(
	temporada_id serial PRIMARY KEY,
	liga_id int NOT NULL references ligas(liga_id),
	nombre varchar NOT NULL,
	numero int,
	fecha_inicio date,
	fecha_fin date
)