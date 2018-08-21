DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(50) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("crampons","Climbing", 8.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("carabiners","Climbing", 6.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("quickdraws","Climbing", 7.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("harness","Climbing", 20.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("belay","Climbing", 25.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rope","Climbing", 30.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sling","Climbing", 20.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GoPro","Climbing", 200.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("helmet","Climbing", 50.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chalk","Climbing", 4.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Body Glide","Climbing", 9.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("webbing","Climbing", 15.00, 10);


show tables;
DESCRIBE products;