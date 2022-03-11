const router = require('express').Router();

//define homepage
router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login', {loggedIn: req.session.loggedIn})
})

// defin login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login')
})

module.exports = router;