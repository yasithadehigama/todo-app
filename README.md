# TODO-APP

This Project created for only for learning purpose

## Installation

1.  Install Node.js and Mysql in your computer (first i installed xampp and used phpmyadmin panel)
2.  Run below SQL query for setup database and tables.
    CREATE DATABASE todoapp;
    USE todoapp;
    CREATE TABLE `user` (nric VARCHAR(50), name VARCHAR(50),
    username VARCHAR(50), password varchar(100),
    occupation VARCHAR(100), dateofbirth VARCHAR(200));

        			CREATE TABLE `tbl_todolist` (nric VARCHAR(50), todoitem VARCHAR(200),
        				startdate VARCHAR(15), targeteddate varchar(15),
        				status VARCHAR(20));

3.  Finally run app.js file using node app.js
