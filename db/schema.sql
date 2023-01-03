DROP DATABASE IF EXISTS tech_blog_db;
CREATE DATABASE tech_blog_db;

USE tech_blog_db;

CREATE TABLE user_data (
    id INT auto_increment NOT NULL,
    username VARCHAR(30),
    pword VARCHAR(30),
    PRIMARY KEY (id)
)

CREATE TABLE blog_posts (
    id INT auto_increment NOT NULL,
    author VARCHAR(30),
    post_data VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (author) REFERENCES username(id) 
)