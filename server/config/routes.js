const mongoose = require('mongoose'),
    Sketch = mongoose.model('Sketch');
var sketches = require('../controllers/sketches.js');
var path = require("path")
module.exports = function(app){

    app.get('/sketches', sketches.showall);
    app.get('/sketch/:id', sketches.show)
    app.post('/sketch/create', sketches.create);
    app.post('/sketch/rate/:id', sketches.rate);
}