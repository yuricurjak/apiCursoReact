const express = require('express')();
const routes = require('./routes');
const cors = require('cors');

let port = 3001;

express.use(cors());
express.use(routes);
express.listen(port, () =>{
    console.log('Server running on port ' + port);
});