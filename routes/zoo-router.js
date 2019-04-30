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

//GET by ID 
router.get('/:id', (req, res) => {
 zooDb('zoos')
    .where({ id: req.params.id })
    // .first()
    .then(zoo => {
        res.status(200).json(zoo)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error retrieving the data'})
    })
})

//POST 
router.post('/', (req, res) => {
    if (!req.body.name) {
        res.status(404).json({ message: 'The name associated with with this zoo could not be found'})
        } else { 
    zooDb('zoos')
    .insert(req.body, 'name')
    .then(id => {
        res.status(201).json(id)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error creating the data'})
    })
}
})
   




module.exports = router;