const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const knex = require('knex');
//router
const zooRouter = require('./routes/zoo-router');
const server = express();


server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


server.use('/api/zoos', zooRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>We have data showing!</h2>
    <p>I hope...</p>
    `)
});

module.exports = server;

// endpoints here