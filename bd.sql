CREATE DATABASE assigment;

USE assigment;
CREATE TABLE users(
    idUser int AUTO_INCREMENT primary key,
    name varchar(50),
    email varchar(100)
);

CREATE TABLE photos(
    idPhoto int AUTO_INCREMENT  primary key,
    idUser int,
    idAlbum int,
    photo varchar(200)
);

CREATE TABLE albums(
    idAlbum int AUTO_INCREMENT  primary key,
    name varchar(200)
);