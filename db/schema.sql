DROP DATABASE homevalue_db;
CREATE DATABASE homevalue_db;
USE homevalue_db;

DROP TABLE mytable;

CREATE TABLE mytable(
    region_id VARCHAR(300),
    size_rank INT(10),
    state_name VARCHAR(300),
    home_value DECIMAL(20,2)

);

LOAD DATA LOCAL INFILE '//Users/davidpascual/Desktop/code/Home-Values/db/values.txt'
INTO TABLE mytable
FIELDS TERMINATED BY '|'
LINES TERMINATED BY '\n'
(REGION_ID, SIZE_RANK, STATE_NAME, HOME_VALUE)