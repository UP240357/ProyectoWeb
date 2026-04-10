create database webDB; 
USE webDB;

CREATE TABLE Careers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    career_id INT,
    active BOOLEAN DEFAULT TRUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT "user", -- user, dev, admin
    failed_attempts INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (career_id) REFERENCES Careers(id)
);

CREATE TABLE Types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    area VARCHAR(100)
);

CREATE TABLE Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE Tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    type_id INT,
    status VARCHAR(20) DEFAULT "open", -- open, in_progress, closed
    priority VARCHAR(20) DEFAULT "low", -- low, medium, high
    created_by INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES Types(id),
    FOREIGN KEY (created_by) REFERENCES Users(id)
);

CREATE TABLE Tickets_Devs (
    id_ticket INT,
    id_user INT,
    assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_ticket, id_user),
    FOREIGN KEY (id_ticket) REFERENCES Tickets(id),
    FOREIGN KEY (id_user) REFERENCES Users(id)
);
