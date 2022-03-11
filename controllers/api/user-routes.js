const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

//all routes use '/users'

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Login
router.post('/login', async (req, res) => {
    try 
    {
      const dbUserData = await User.findOne({
        where: {
          email: req.body.emailLogin,
        },
      });
  
      if (!dbUserData) 
      {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.passwordLogin);
  
      if (!validPassword)
      {
        res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      await req.session.save(() => {
          //save who is logged in and user
        req.session.loggedIn = true;
        req.session.user_id = dbUserData.id;
        res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
      });
  
    }catch (err)
    {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  router.get('/logout', async (req, res) => {
    if (req.session.loggedIn) {
      await req.session.destroy( () => res.status(200).end())
    }
    else {
      res.status(400).end()
    }
  })
  
  
  //Get all users
  router.get('/', async (req, res) =>{
      try
      {
          const allUserData = await User.findAll({include:[{model:Favorites}, {model:Search}]});
          res.status(200).json(allUserData);
  
      }catch(err)
      {
          console.log(err);
          res.status(500).send(err);
      }
  });
  

  
  module.exports = router;
  