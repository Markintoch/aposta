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

CREATE TABLE IF NOT EXISTS equipos(
	equipo_id serial PRIMARY KEY, 
	liga_id int NOT NULL,
	temporada_id int NOT NULL references temporadas(temporada_id),
	nombre varchar NOT NULL,
	logo varchar,
	activo bool NOT NULL
)

CREATE TABLE IF NOT EXISTS jornadas(
	jornada_id serial PRIMARY KEY,
	liga_id int NOT NULL,
	temporada_id int NOT NULL references temporadas(temporada_id),
	numero int NOT NULL,
	nombre varchar NOT NULL,
	fecha_inicio date,
	fecha_fin date
)

CREATE TABLE IF NOT EXISTS partidos(
	partido_id serial PRIMARY KEY,
	liga_id int NOT NULL,
	temporada_id int NOT NULL,
	jornada_id int NOT NULL references jornadas(jornada_id), 
	vistante_id int NOT NULL, 
	local_id int NOT NULL, 
	jornada_original int NOT NULL
)

CREATE TABLE IF NOT EXISTS resultados(
	resultado_id serial PRIMARY KEY,
	partido_id int NOT NULL references partidos(partido_id),
	marcador_local int NOT NULL,
	marcador_visitante int NOT NULL, 
	ganador_id int NOT NULL
)

CREATE TABLE IF NOT EXISTS pronosticos(
	pronostico_id serial PRIMARY KEY,
	user_id int NOT NULL,
	partido_id int NOT NULL references partidos(partido_id),
	ganador_id int NOT NULL,
	created_on date
)