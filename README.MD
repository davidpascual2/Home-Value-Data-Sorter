
## Installation

if you receive an error on MySQL stating "loading local data is disabled", do the following steps:
* `mysql -u root -p`
* mysql> `SET GLOBAL local_infile=1;`
2. quit current server
`mysql> quit
Bye`
3. connect to the server with local-infile system variable :
`mysql --local-infile=1 -u root -p`

this should now allow you to load local data into you mySQL database.

