// create web server
// import module
const express = require('express');
const router = express.router();
const commentController = require('../controllers/comment');

// handle request
router.get('/', commentController.comment_list);
router.get('/create', commentController.comment_create_get_comment);
router.get('/create', commentController.comment_create_post_comment);
router.get('/:id/delete', commentController.comment_delete);