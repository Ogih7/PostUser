const express = require('express');
const router = express.Router();

const { createPost, deletePost} = require('../controllers/posts')

router.post('/', createPost)
router.delete('/:id', deletePost)

module.exports = router;