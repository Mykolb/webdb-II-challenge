const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: { //string or object
        filename: './data/lambda.sqlite3',
    },
    useNullAsDefault: true, //only needed for sqlite3 when you see err message in terminal
};

const zooDb = knex(knexConfig);

//******REQUESTS*********
//GET 
router.get('/', (req, res) => {
    //select * from zoos
    zooDb('zoos')
    .then(zoos => {
        res.status(200).json(zoos)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'Zoos could not be found'})

    })
})










module.exports = router;