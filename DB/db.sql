ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '3229';
flush privileges;

CREATE DATABASE IF NOT EXISTS Dalilah_Restaurant;

USE Dalilah_Restaurant;

CREATE TABLE Users(
	id INT(11) NOT NULL AUTO_INCREMENT,
    usuario VARCHAR(45),
    nombre VARCHAR(45),
    correo VARCHAR(45),
    celular VARCHAR(45),
    direccion VARCHAR(45),
    contrasena VARCHAR(45),
    rol INT(45),
    CONSTRAINT fk_roles FOREIGN KEY (rol) REFERENCES roles(id),
    PRIMARY KEY(id)
);

CREATE TABLE roles(
	id INT(45) NOT NULL AUTO_INCREMENT,
    role INT(3),
    PRIMARY KEY(id)
);

CREATE TABLE Products(
	id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) DEFAULT NULL,
    precio INT(11) default NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Pedidos(
	id INT(11) NOT NULL AUTO_INCREMENT primary key,
    total INT(11) NOT NULL,
    estado INT(3) NOT NULL,
    IdUsuario INT(11) NOT NULL,
    IdProducto INT(11) NOT NULL,
	CONSTRAINT fk_usuario FOREIGN KEY (IdUsuario) REFERENCES Users (id),
    CONSTRAINT fk_products FOREIGN KEY (IdProducto) REFERENCES Products (id)
);

INSERT INTO roles VALUES
	(1,1),
    (2,2),
    (3,3);

INSERT INTO Users values 
	(1,'Camilot','Camilo Torres','ca@gmail.com','3023521045','cr 64 A # 62 c 71 sur','123456',1);
    
INSERT INTO Products values
	(1,'Perro',3600),
    (2,'Gaseosa Cocacola 1 litro',4500);
    
INSERT INTO Pedidos values
	(1,3600,1,1,1),
    (3,4500,1,1,1);

select * from Pedidos;
select * from Products;
select * from Users;

