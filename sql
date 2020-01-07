CREATE DATABASE todoapp;
USE todoapp;
CREATE TABLE `user` (nric VARCHAR(50), name VARCHAR(50),
    username VARCHAR(50), password varchar(100),
    occupation VARCHAR(100), dateofbirth VARCHAR(200));

CREATE TABLE `tbl_todolist` (nric VARCHAR(50), todoitem VARCHAR(200),
    startdate VARCHAR(15), targeteddate varchar(15),
    status VARCHAR(20));