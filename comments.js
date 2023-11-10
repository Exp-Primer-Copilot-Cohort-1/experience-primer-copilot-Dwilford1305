// create web server
const express = require('express');
// create router
const router = express.Router();
// import comments model
const Comments = require('../models/comments');

// GET /comments
// get all comments
router.get('/', (req, res) => {
    Comments.find()
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            res.json(err);
        });
});

// GET /comments/:id
// get single comment by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Comments.findById(id)
        .then(comment => {
            res.json(comment);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            res.json(err);
        });
});

// POST /comments
// add new comment
router.post('/', (req, res) => {
    const comment = req.body;
    Comments.create(comment)
        .then(comment => {
            res.json(comment);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            res.json(err);
        });
});

// PUT /comments/:id
// update comment by id
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    Comments.findByIdAndUpdate(id, comment, { new: true })
        .then(comment => {
            res.json(comment);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            res.json(err);
        });
});

// DELETE /comments/:id
// delete comment by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Comments.findByIdAndDelete(id)
        .then(comment => {
            res.json(comment);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            res.json(err);
        });
});

// export router
module.exports = router;