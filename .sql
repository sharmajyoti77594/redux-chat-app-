--Command to install psql in ubuntu
sudo apt install postgresql postgresql-contrib

--Switching over the postgres account(default user)
Sudo -i -u postgres

Psql

--To create database
create database demo

--To connect with database
\c demo

--To create table in psql
CREATE TABLE user_table(id INT SERIAL PRIMARY KEY, first_name VARCHAR(8), last_name VARCHAR(8), email_ VARCHAR(), password VARCHAR(15), token TEXT, created_at TIMESTAMP);

CREATE TABLE chats_table(id INT SERIAL PRIMARY KEY, sender_id INT REFERENCES user_table(id), receiver_id INT REFERENCES user_table(id), body TEXT, created_at TIMESTAMP, updated_at TIMESTAMP);
