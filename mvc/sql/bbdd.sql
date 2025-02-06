CREATE DATABASE macrobaddy;

USE macrobaddy;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);
INSERT INTO usuarios (nombre) VALUES ('antonio');