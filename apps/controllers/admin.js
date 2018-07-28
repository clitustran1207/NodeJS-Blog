var express = require('express');
var router = express.Router();

var Users = require('../models/users');
var Posts = require('../models/posts');
var Helpers = require('../helpers/helper');

router.get('/', (req, res) => {
    var data = Posts.getAllPost();
    data.then((posts) => {
        res.render('admin/dashboard', { data: {
            posts: posts, 
            error: false
        }});
    }).catch((error) => {
        res.render('admin/dashboard', { data: {
            error: "Have error when getting all Posts"
        }});
    });    
});

router.get('/add-post', (req,res) => {
    res.render('admin/post/new', { data: {}});
});
router.post('/add-post', (req, res) => {
    var post = req.body;
    //console.log(post);
    if(!post.title || post.title.trim().length == 0){
        res.render('admin/post/new', { data: {
            error: 'Title is required.'
        }});
    }
    else if(!post.author || post.author.trim().length == 0){
        res.render('admin/post/new', { data: {
            error: 'Author is required.'
        }});
    }
    else if(!post.content || post.content.trim().length == 0){
        res.render('admin/post/new', { data: {
            error: 'Content is required.'
        }});
    }
    else {
        var result = Posts.addPost(post);
        result.then(() => {
            res.redirect('/admin');
        })
        .catch(() => {
            res.render('new', { data: {
                error: 'Could not insert post to DB.'
            }});
        });
    }
});
router.get('/signup', (req, res) => {
    res.render('signup', { data: {}});
});
router.post('/signup', (req, res) => {
    var user = req.body;
    if(!user.email){
        res.render('signup', { data: {
            error: 'Email is required.'
        }});
    }
    else if(!user.password){
        res.render('signup', { data: {
            error: 'Password is required.'
        }});
    }
    else if(user.password != user.confirm_password){
        res.render('signup', { data: {
            error: 'Password is not match.'
        }});
    }
    else {
        user = {
            email: user.email,
            password: Helpers.hashPassword(user.password) 
        };
        var result = Users.addUser(user);
        result.then(() => {
            res.redirect('/admin/login');
        })
        .catch(() => {
            res.render('signup', { data: {
                error: 'Could not insert user to DB.'
            }});
        });
    }
});
router.get('/login', (req, res) => {
    res.render('login', { data: {}});
});
router.post('/login', (req, res) => {
    var params = req.body;
    //console.log(params);
    if(!params.email){
        res.render('login', { data: {
            error: 'Email is required.'
        }});
    } else {
        var data = Users.getUser(params.email);
        if(data){
            data.then((users) => {
                var user = users[0];
                console.log(user);
                console.log(users);
                var status = Helpers.comparePassword(params.password, user.password);
                if(status){
                    req.session.user = user;
                    //console.log(req.session.user);
                    res.redirect('/admin');
                } else {
                    res.render('login', { data: {
                        error: 'Wrong Password.'
                    }});
                }
            })
            .catch((error) => console.log(error));
        } else {
            res.render('login', { data: {
                error: 'User is not exist.'
            }});
        }
    }
});

module.exports = router;