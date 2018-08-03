const express = require('express');

const router = express.Router();

router.use('/admin', require(__dirname + '/admin'));
router.use('/blog', require(__dirname + '/blog'));

router.get('/', (req, res) => {
    res.render('test');
});

router.get('/chat', (req, res) => {
    res.render('chat');
});

module.exports = router;