#Comenzamos a practicar 
#Creamos la base de datos
CREATE DATABASE IF NOT EXISTS products;

#Seleccionamos la base de datos
USE products;

#Creamos la tabla de productos
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL
);

INSERT INTO products (name, description, image) VALUES
(
    'Baby Yoda Blue Ball',
    'Disfruta de una saga que sigue agregando personajes a su colección',
    '../../Multimedia/FunkosInterior/baby-yoda-1.webp'
),
(
    'Charmander',
    'Atrapa todos los que puedas y disfruta de una colección llena de amigos',
    '../../Multimedia/FunkosInterior/charmander-1.webp'
),
(
    'Harry Potter',
    'Revive los recuerdos de una saga llena de magia y encanto',
    '../../Multimedia/FunkosInterior/harry-1.webp'
);

SELECT * FROM products;


