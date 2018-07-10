var express = require('express');
var router = express.Router();

var Users = require('../models/users');

router.get('/', (req, res) => {
    res.json({
        'message': 'This is Admin Page'
    });
});

router.get('/signup', (req, res) => {
    res.render('signup', { data: {}});
});
router.post('/signup', (req, res) => {
    var user = req.body;
    //console.log(user);
    if(user.email.trim().length==0){
        res.render('signup', { data: {
            error: 'Email is required'
        }});
    }
    if(user.password.trim().length==0){
        res.render('signup', { data: {
            error: 'Password is required'
        }});
    }
    if(user.password != user.confirm_password){
        res.render('signup', { data: {
            error: 'Password is not match'
        }});
    }
    user = {
        email: user.email,
        password: user.password
    };
    var result = Users.addUser(user);
    if(!result){
        res.render('signup', { data: {
            error: 'Could not insert user to DB'
        }});
    } else {
        res.json({
            message: 'Insert successfully'
        });
    }
})

module.exports = router;