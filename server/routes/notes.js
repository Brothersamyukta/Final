var express = require("express")
var router = express.Router();

const Note = require('../models/note')

var ObjectId = require('mongodb').ObjectId;


router.get('/', (req,res,next) => {
    Note.find()
    // .sort({title:-1})
    .then(notes => {
        res.status(200).json({
            message: "Notes fetched Successfully!!",
            notes: notes
        })
    })
    .catch((error)=> {
        res.status(500).json({
            message: "There was an Error",
            error: error
        })
    })
})

router.post('/', (req, res, next) => {

    const title = req.body.title;
    const description = req.body.description 

    const note = new Note({
        title:title,
        description: description
    })
    note.save()
        .then(createdNote => {
            res.status(201).json({
                message: "Notes added Succefully!!",
                note: createdNote
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "An error Occurred",
                error: error,
            })
       
        })

})

router.put("/:id", (req, res, next)=> {
    // console.log(req.params.id)
    // console.log(req.body.title)
    // console.log(req.body.description)
    // console.log(req.body._id)
    
    const notes = new Note({
        _id: req.body._id,
        title: req.body.title,
        description: req.body.description
    }) 

    Note.updateOne({ 
        _id: ObjectId(req.params.id)
    },
    notes
    )

    .then(update => {
        res.status(204).json({
            message: "Note updated Successfully!!"
        })
    })

    .catch(error=> {
        res.status(500).json({
            message: "An error Occured",
            error:error
        })
    })


    // Note.findOne({id: req.params.id})
    //     .then(note => {
    //         note.title = req.body.title 
    //         note.description = req.body.description

    //         Note.updateOne({id: req.params.id},note)
    //         .then(reuslt => {
    //             res.status(204).json({
    //                 message: "Note updated Successfully!!"
    //             })
    //         })
    //         .catch(error=> {
    //             res.status(500).json({
    //                 message: "An error Occured",
    //                 error:error
    //             })
    //         })
    //     })
    //     .catch((error) => {
    //         res.status(500).json({
    //           message: "Note not found.",
    //         });
    //       });

});

router.delete("/:id", (req, res, next) => {
    console.log(req.params.id)
    Note.findOne({ _id: ObjectId(req.params.id) })
      .then((note) => {
          console.log(note)
        Note.deleteOne({ _id: req.params.id })
          .then((result) => {
            res.status(204).json({
              message: "Note deleted successfully",
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "An error occurred",
              error: error,
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Note not found.",
        });
      });
  });

  module.exports = router;
  