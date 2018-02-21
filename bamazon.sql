-- Drops the favorite_db if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "favorite_db" database --
CREATE DATABASE bamazon;

USE bamazon;

-- Make it so all of the following code will affect favorite_db --

-- Creates the table "favorite_foods" within favorite_db --
CREATE TABLE products (
	id INTEGER(10) NOT NULL,
	product_name VARCHAR(50),
    department_name VARCHAR(50),
    price INTEGER(10),
    stock_quantity INTEGER(10),
    primary key (id)

);


INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (1, "Macbook Pro", "Electronics", 2000, 5), (2, "Dell XPS", "Electronics", 1500, 5), (3, "iPhone X", "Electronics", 1000, 10), 
(4, "Galaxy S8", "Electronics", 500, 10), (5, "PS4 Pro", "Electronics", 400, 10), (6, "XBox One X", "Electronics", 500, 10),
(11, "Shadow of the Collosus", "Video Games", 40, 100), (12, "Monster Hunter", "Video Games", 60, 100), (13, "Grand Theft Auto", "Video Games", 30, 100),
(14, "NBA 2k18", "Video Games", 40, 100);

