-- Eliminar tablas si existen.
DROP TABLE IF EXISTS content;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS users;

-- Crear tabla de marcas.
CREATE TABLE brands (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Crear tabla de usuarios.
CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    first_name    VARCHAR(100) NOT NULL,
    last_name     VARCHAR(100) NOT NULL,
    age           INT CHECK (age > 0),
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT
);

-- Crear tabla de productos.
CREATE TABLE products (
    id          SERIAL PRIMARY KEY,
    brand_id    INT NOT NULL REFERENCES brands(id),
    name        VARCHAR(255) NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    payments    VARCHAR(255),
    description TEXT,
    stock       INT,
    user_id     INT REFERENCES users(id)
);

-- Crear tabla de contenido (imágenes).
CREATE TABLE content (
    id            SERIAL PRIMARY KEY,
    product_id    INT REFERENCES products(id),
    primary_image VARCHAR(255)
);

-- Insertar marcas.
INSERT INTO brands (name) VALUES 
    ('Star Wars'),
    ('Pokemon'),
    ('Harry Potter');

-- Insertar usuario.
INSERT INTO users (first_name, last_name, age, email, password_hash) VALUES
    ('root_firstname', 'root_lastname', 100, 'admin@gmail.com', '');

-- Insertar productos con descripciones completas.
INSERT INTO products (brand_id, name, price, payments, description, stock) VALUES
    (1, 'Bobbafeth',            1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de Bobbafeth, legendario cazarrecompensas mandaloriano de Star Wars.', 0),
    (2, 'Dragonite',            1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de Dragonite, el poderoso y amigable Pokémon dragón.', 0),
    (3, 'Hermione',             1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de Hermione Granger, la bruja más brillante de su generación.', 0),
    (1, 'Luke Skywalker',       1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de Luke Skywalker, el Jedi que restauró el equilibrio en la Fuerza.', 0),
    (2, 'Pidgeotto',            1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de Pidgeotto, el ágil Pokémon volador de la región Kanto.', 0),
    (3, 'Luna Lovegood',        1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de Luna Lovegood, con sus icónicas gafas espectrales.', 0),
    (2, 'Pikachu',              1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de Pikachu, el Pokémon más querido.', 0),
    (3, 'Snape Patronus',       1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de Snape en forma de Patronus. Representación etérea del maestro más enigmático de Hogwarts.', 0),
    (1, 'Trooper',              1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de un Stormtrooper. El soldado imperial más temido, en versión Funko Pop!', 0),
    (2, 'Vulpix',               1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de Vulpix, el Pokémon zorro de fuego con seis colas elegantes.', 0),
    (1, 'Baby Yoda Blue Ball',  1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de Baby Yoda (Grogu) - The Mandalorian Saga, edición limitada.', 0),
    (2, 'Charmander',           1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de Charmander, el inicial de tipo fuego.', 0),
    (3, 'Harry Potter',         1799.00, '3 CUOTAS SIN INTERES', 'Figura coleccionable de Harry Potter, con su varita y cicatriz inconfundible.', 0);

-- Insertar imágenes.
INSERT INTO content (product_id, primary_image) VALUES
    (1,  '../../Multimedia/FunkosInterior/bobbafeth-1.webp'),
    (2,  '../../Multimedia/FunkosInterior/dragonite-1.webp'),
    (3,  '../../Multimedia/FunkosInterior/hermione-1.webp'),
    (4,  '../../Multimedia/FunkosInterior/luke-1.webp'),
    (5,  '../../Multimedia/FunkosInterior/pidgeotto-1.webp'),
    (6,  '../../Multimedia/FunkosInterior/luna-1.webp'),
    (7,  '../../Multimedia/FunkosInterior/pikachu-1.webp'),
    (8,  '../../Multimedia/FunkosInterior/snape-patronus-1.webp'),
    (9,  '../../Multimedia/FunkosInterior/trooper-1.webp'),
    (10, '../../Multimedia/FunkosInterior/vulpix-1.webp'),
    (11, '../../Multimedia/FunkosInterior/baby-yoda-1.webp'),
    (12, '../../Multimedia/FunkosInterior/charmander-1.webp'),
    (13, '../../Multimedia/FunkosInterior/harry-1.webp');

-- Asignar todos los productos al usuario admin.
UPDATE products SET user_id = 1;
