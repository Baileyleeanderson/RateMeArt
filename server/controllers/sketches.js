var mongoose = require('mongoose');
let Sketch = mongoose.model('Sketch');

module.exports = {

    showall: (req, res)=>{
        Sketch.find({}, (err, sketches)=>{
            if(err){
            }
            else{
                res.json({sketches:sketches});
            };
        });
    },

    show: (req, res)=>{
        Sketch.findOne({_id: req.params.id}, (err,sketch)=>{
            if(err){
            }
            else{
                res.json({sketch: sketch});
            };
        });
    },

    create: (req, res)=>{
        var sketch = new Sketch({artist: req.body.artist, sketch: req.body.sketch});
        sketch.save((err, sketch)=>{
            if(err){
            }
            else{
                res.json({sketch: sketch})
            };
        });
    },

    rate: (req, res)=>{
        sketch_id = req.params.id;
        console.log("sketch id", sketch_id);
        Sketch.findOneAndUpdate({_id: sketch_id},{$push: {comments: {comment: req.body.comment, rating: req.body.rating}}}, (err, new_comment)=>{
            console.log("made it to controller", new_comment)
            new_comment.save((err, comment)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.json({comment: new_comment})
                }
            })
        });
    }

}