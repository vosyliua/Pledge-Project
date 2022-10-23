
-- make sure the websiteuser account is set up and has the correct privileges
CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;

DROP TABLE IF EXISTS accounts;

CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(25) NOT NULL,
  pass VARCHAR(70) NOT NULL ,
  role varchar(30) NOT NULL

);

CREATE TABLE IF NOT EXISTS causes(
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description VARCHAR (500) NOT NULL,
  money MEDIUMINT UNSIGNED NOT NULL,
  photo VARCHAR (200) NOT NULL,
  deadline VARCHAR (100) NOT NULL,
  username VARCHAR (50) NOT NULL,
  createdDate VARCHAR (100) NOT NULL
);

CREATE TABLE IF NOT EXISTS pledges(
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(200) NOT NULL,
  causeid MEDIUMINT UNSIGNED,
  username VARCHAR(50) NOT NULL,
  date VARCHAR(50) NOT NULL

);

INSERT INTO accounts(user, pass,role)
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO", "admin");
