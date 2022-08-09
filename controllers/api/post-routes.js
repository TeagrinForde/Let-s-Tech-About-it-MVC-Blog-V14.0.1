const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//CREATE a new post
router.post('/', withAuth, async (req, res) => {

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

//Update existing post
router.put('/:id', withAuth, async (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((post) => {
        res.json(post)
    }).catch((err) => {
        res.json(err)
    })
});

//DELETE a new post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'Post not found.'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;