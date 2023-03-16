const router = require('express').Router();
const mysql = require('mysql2');
const { engine } = require('express-handlebars');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

router.get('/', (req, res) => {
    pool.query('SELECT * FROM mytable', (error, results, fields) => {
        if (error) {
            console.error('error retreiving database: '+ error.stack );
            res.status(500).send('internal server error');
            return
        }
        // const values = results.data
        const values = results.map((value) => {
            return{...value}
        })
        res.render('home', {values})
    });
});

module.exports = router;