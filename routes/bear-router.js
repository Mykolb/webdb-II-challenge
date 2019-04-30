const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: { //string or object
        filename: './data/bears.db3',
    },
    useNullAsDefault: true, //only needed for sqlite3 when you see err message in terminal
};

const bearDb = knex(knexConfig);

//******REQUESTS*********
//GET 
router.get('/', (req, res) => {
    //select * from zoos
    bearDb('bears')
    .then(bears => {
        res.status(200).json(bears)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'Bears could not be found'})
    })
})

// //GET by ID 
// //select * from roles where id = :id
// router.get('/:id', (req, res) => {
//     bearDb('bears')
//        .where({ id: req.params.id })
//        .first()
//        .then(bear => {
//            if(bear) {
//              res.status(200).json(bear);
//            } else {
//            res.status(404).json({ message: 'The bear associated with this id cannot be found' });
//            }
//        })
//        .catch(err => {
//            res.status(500).json({ error: err, message: 'There was an error retrieving the data'})
//        })
//    });
   

   //POST 
router.post('/', (req, res) => {
    // if (!req.body.name) {
    //     res.status(404).json({ message: 'The name associated with with this bear could not be found'})
    //     } else { 
    bearDb('bears')
    .insert(req.body, 'name')
    .then(id => {
        res.status(201).json(id)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error creating the data'})
    })
// }
})
   
//PUT 
// router.put('/:id', (req, res) => {
//     zooDb('bears')
//     .where({ id: req.params.id})
//     .update(req.body)
//     .then(bear => {
//         if(bear === 0) {
//             res.status(404).json({ message: 'The bear associated with this id cannot be found' }); 
//         } else {
//             res.status(201).json(bear)
//         }
//     })
//     .catch(err => {
//         res.status(500).json({ error: err, message: 'There was an error updating the data'})
//     })
// })

//DELETE 
// router.delete('/:id', (req, res) => {
//     bearDb('bears')
//     .where({ id: req.params.id})
//     .del()
//     .then(bear => {
//         if(bear === 1) {
//             res.status(200).end()
//         }
//     })
//     .catch(error => {
//         res.status(500).json({ error: err, message: 'There was an error deleting the data'})
//     })
// })







module.exports = router;