const mongoose = require('mongoose');

var sketchSchema = new mongoose.Schema({
    artist: String,
    sketch: String,
    comments: [{
        comment: String,
        rating: Number
    }]
});
mongoose.model('Sketch', sketchSchema);