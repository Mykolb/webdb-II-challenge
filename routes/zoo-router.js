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
//select * from roles where id = :id
router.get('/:id', (req, res) => {
 zooDb('zoos')
    .where({ id: req.params.id })
    .first()
    .then(zoo => {
        if(zoo) {
          res.status(200).json(zoo);
        } else {
        res.status(404).json({ message: 'The zoo associated with this id cannot be found' });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error retrieving the data'})
    })
});

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
   

//PUT 
router.put('/:id', (req, res) => {
    zooDb('zoos')
    .where({ id: req.params.id})
    .update(req.body)
    .then(zoo => {
        if(zoo === 0) {
            res.status(404).json({ message: 'The zoo associated with this id cannot be found' }); 
        } else {
            res.status(201).json(zoo)
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error updating the data'})
    })
})

//DELETE 
router.delete('/:id', (req, res) => {
    zooDb('zoos')
    .where({ id: req.params.id})
    .del()
    .then(zoo => {
        if(zoo === 1) {
            res.status(200).end()
        }
    })
    .catch(error => {
        res.status(500).json({ error: err, message: 'There was an error deleting the data'})
    })
})




module.exports = router;