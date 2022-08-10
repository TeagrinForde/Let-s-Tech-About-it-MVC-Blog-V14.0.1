const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//CREATE a new comment
router.post('/', withAuth, (req, res) => {

    try {
        const dbBlogs = Comment.create({
            comment: req.body.comment,
            commentDate: req.body.commentDate,
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

//UPDATE a new comment
router.put('/:id', withAuth, (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.status(200).json(updated)
});

//DELETE a new comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'Comment not found.'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;