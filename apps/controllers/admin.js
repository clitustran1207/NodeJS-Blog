var express = require('express');
var router = express.Router();

var Users = require('../models/users');
var Posts = require('../models/posts');
var Helpers = require('../helpers/helper');

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
                //console.log(user);
                //console.log(users);
                var status = Helpers.comparePassword(params.password, user.password);
                if(status){
                    req.session.user = user;
                    //console.log(req.session.user);
                    res.render('admin/post/dashboard', { data: {
                        name: req.session.user.email
                    }});
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
router.get('/posts', (req, res) => {
    if(req.session.user){
        var data = Posts.getAllPost();
        data.then((posts) => {
            res.render('admin/post/dashboard', { data: {
                posts: posts, 
                error: false
            }});
        }).catch((error) => {
            res.render('admin/post/dashboard', { data: {
                error: "Have error when getting all Posts"
            }});
        });    
    } else {
        res.redirect("/admin/login");
    }
    
});
router.get('/add-post', (req,res) => {
    if(req.session.user){
        res.render('admin/post/new', { data: {}});
    } else {
        res.redirect('/admin/login');
    }
    
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
            res.redirect('/admin/posts');
        })
        .catch(() => {
            res.render('new', { data: {
                error: 'Could not insert post to DB.'
            }});
        });
    }
});
router.get('/edit-post/:id', (req, res) => {
    if(req.session.user){
        var id = req.params.id;
        var result = Posts.getPostById(id);
        result.then((posts) => {
            var post = posts[0];
            res.render('admin/post/edit', { data: {
                post: post 
            }});
        })
        .catch(() => {
            res.render('admin/dashboard', { data: {
                error: 'Could not edit this post.'
            }});
        });
    } else {
        res.redirect('/admin/login');
    }
});
router.put('/edit-post', (req, res) => {
    var new_post = req.body;
    var result = Posts.updatePost(new_post);
    if(result){
        result.then(() => {
            res.json({ status_code: 200 });
        })
        .catch(() => {
            res.json({ status_code: 500 });
        });
    } else {
        res.json({ status_code: 500 });
    }
});
router.delete('/delete-post', (req, res) => {
    var post_id = req.body.id;
    var result = Posts.deletePost(post_id);
    if(result){
        result.then(() => {
            res.json({ status_code: 200 });
        })
        .catch(() => {
            res.json({ status_code: 500 });
        });
    } else {
        res.json({ status_code: 500 });
    }
});
router.get('/users', (req, res) => {
    if(req.session.user){
        var data = Users.getAllUser();
        data.then((users) => {
            res.render('admin/user/list', { data: {
                users: users
            }});
        }).catch(() => {
            res.render('admin/user/list', { data: {
                error: "Have error when getting all Users"
            }});
        });
    } else {
        res.redirect('/admin/login');
    }
});

module.exports = router;