DROP DATABASE IF EXISTS have_fun;
CREATE DATABASE have_fun;

\c have_fun

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  firstname VARCHAR ,
  lastname VARCHAR ,
  email VARCHAR unique NOT NULL,
  password VARCHAR NOT NULL,
  phone VARCHAR(10) NOT NULL,
  gender VARCHAR ,
  location VARCHAR,
  is_admin boolean DEFAULT 'f'
);

CREATE TABLE activity
(
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  description VARCHAR,
  time VARCHAR,
  location VARCHAR,
  date VARCHAR,
  image VARCHAR,
  user_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE

);

CREATE TABLE list
(
  id SERIAL PRIMARY KEY,
  name VARCHAR ,
  note VARCHAR,
  activity_id int NOT NULL,
  FOREIGN KEY (activity_id) REFERENCES activity ON DELETE CASCADE,
  user_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE
);

-- INSERT INTO users
--   (id,username,firstname ,lastname ,email,password ,phone ,gender,location )
-- VALUES
--   (1,'1a', 'a', 'a', 'a@a', 'a', '11', 'f', 'a');
-- INSERT INTO activity
--   (id ,title, description, time, location, date , image ,user_id)
-- VALUES
--   (1,'a', 'a', 'a', 'a', 'a', 'a', 1);

-- INSERT INTO list
--   (id,name, note, activity_id, user_id)
-- VALUES
--   (1,'a', 'a', 1, 1);


