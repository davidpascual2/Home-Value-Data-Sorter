const router = require('express').Router();
const mysql = require('mysql2');
const { engine } = require('express-handlebars');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//==================== HOME ROUTE =======================//

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

//====================== STATE ROUTE ======================//

router.get('/state' , (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database: '+ err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        connection.query('SELECT * FROM mytable ORDER BY state_name', function(error, results, fields) {
            connection.release();

            if(error) {
                console.error('Error retreiving data from database: ' + error.stack);
                res.status(500).send('Internal server error')
                return;
            }
            var data = groupByState(results);
            res.render('state', { data })
        })
    })
})


// STATE FUNCTION 

const groupByState = (data) => {
    const groupedData = {};
    if(!Array.isArray(data)) {
        return groupedData;
    }
    data.forEach(row => {
        const state = row.state;

        if(!groupedData[state]) {
            groupedData[state] = []
        }

        groupedData[state].push(row);
    });

    const sortedData = {};

    Object.keys(groupedData).sort().forEach(state => {
        sortedData[state] = groupedData[state];
    });

    return sortedData;
};



//===================== PRICE ROUTE =====================//

router.get('/price' , (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database: '+ err.stack);
            res.status(500).send('Internal server error'); //for user
            return;
        }

        connection.query('SELECT * FROM mytable ORDER BY home_value', (error, results, fields) => {
            connection.release();

            if(error) {
                console.error('Error retrieving data from database: '+ error.stack);
                res.status(500).send('Internal server Error');
                return;
            }

            var data = groupByPrice(results);
            res.render('price', { data });
        });
    });
});

// PRICE FUNCTION 

const groupByPrice = (data) => {
    const groupedData = {};

    if(!Array.isArray(data)) {
        return groupedData;
    }

    data.forEach(row => {
        const price = row.price;

        if(!groupedData[price]){
            groupedData[price] = [];
        }

        groupedData[price].push(row);
    });

    const sortedData = {};
    Object.keys(groupedData).sort().forEach(price => {
        sortedData[price] = groupedData[price];
    });
    return sortedData
};


module.exports = router;