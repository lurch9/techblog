const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, Comment, User } = require('../models');


//store all the posts
router.post('/', withAuth, async (req, res) => {
    try {
      const newPostData = await Post.create({
        title: req.body.post_title,
        content: req.body.post_data,
        user_id: req.session.user_id,
      });
      console.log(req.session.user_id)
  
      res.status(200).json(newPostData);
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  });
  
//redirect to dashboard, show all posts
router.get('/', withAuth, async (req, res) => {
try {
    if (!req.session.loggedIn) {
        res.redirect('/login')
    }

    else {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    order: [ [ 'createdAt', 'DESC']]                
                }
            ]
        })
            // Serialize data so the templa
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts)

        res.render('dashboard', {posts, loggedIn: req.session.loggedIn})
    }
}

catch(err)
{
    console.log(err);
    res.status(500).send(err);
}
})

//update a post in dashboard
router.put('/post/update/:id', async (req, res) => {
    try {

        const postUpdate = await Post.update(
            {
                title: req.body.post_title,
                content: req.body.post_data,
                user_id: req.session.user_id,
        
            },
            {
                where: {
                    id: req.params.id,
                },
            });
        res.status(200).json(postUpdate);

            
    }
    catch(err) {
        console.log("UPDATE", err);
        res.status(500).send(err)
    }
})

router.get('/post/update/:id', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login')
        }
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    order: [ [ 'createdAt', 'DESC']]
                }
            ]
        })
            // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {posts, loggedIn: req.session.loggedIn})
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

//delete post in dashboard
router.delete('/post/delete/:id', async (req, res) => {
        try
    {
        const deletedPost = await Post.destroy({where:{id: req.params.id}});
        if(!deletedPost)
        {
            res.status(404).json({message: 'No Post with that id found!!'});
            return;
        }

        res.status(200).json(deletedPost);

    }catch(err)
    {
        console.log(err);
        res.status(500).send(err);
    }

})

router.get('/post/delete/:id', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login')
        }
    
        else {
            const postData = await Post.findAll({
                include: [
                    {
                        model: User,
                        order: [ [ 'createdAt', 'DESC']]
                    }
                ]
            })
            const posts = postData.map((post) => post.get({ plain: true }));
    
            res.render('dashboard', {posts, loggedIn: req.session.loggedIn})
        }
    }
    
    catch(err)
    {
        console.log(err);
        res.status(500).send(err);
    }
    

})



//create a comment for the post
router.post('/comment', async (req, res) => {
    try {
        const newCommentData = await Comment.create({
          comment_content: req.body.comment_data,
          user_id: req.session.user_id,
          post_id: req.body.post_id
        });
        console.log("SESSION", req.body.post_id)
        res.status(200).json(newCommentData);
      } catch (err) {
        res.status(400).json(err);
        console.log(err);
      }

})

//get the comments for the specific post
router.get('/comment/:id', async(req, res) => {
    try {
        console.log(req.params.id, "ID")
        const commentData = await Comment.findAll({where: {post_id: req.params.id},
            include: [
                {
                    model: User,
                    order: [ [ 'createdAt', 'DESC']]
                }
            ]
})
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.render("post", {post_id: req.params.id, comments, loggedIn: req.session.loggedIn });
        console.log("******************************", comments)
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
})
module.exports = router;


