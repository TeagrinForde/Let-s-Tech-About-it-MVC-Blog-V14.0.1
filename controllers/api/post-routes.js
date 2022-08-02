const router = require('express').Router();
const { Post } = require('../../models');

//CREATE a new post
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const dbBlogs = await Post.create({
            postTitle: req.body.postTitle,
            post: req.body.post,
            postDate: req.body.postDate,
            username: req.body.username,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(dbBlogs);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;

module.exports = router;