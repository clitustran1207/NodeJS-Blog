const express = require('express');
const router = express.Router();

var Posts = require('../models/posts');

router.get('/', (req, res) => {
    var data = Posts.getAllPost();
    data.then((posts) => {
        res.render('blog/index', { data: {
            posts: posts
        }});
    }).catch((error) => {
        res.render('blog/index', { data: {
            error: error
        }});
    });
});
router.get('/post/:id', (req, res) => {
    var data = Posts.getPostById(req.params.id);
    data.then((posts) => {
        var post = posts[0];
        res.render('blog/detail', { data: {
            post: post
        }});
    }).catch((error) => {
        res.render('blog/index', { data: {
            error: error
        }});
    });
});

module.exports = router;