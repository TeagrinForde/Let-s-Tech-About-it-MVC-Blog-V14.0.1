const router = require('express').Router();
const { Comment } = require('../../models');

//CREATE a new comment
router.post('/', async (req, res) => {

    try {
        const dbBlogs = await Comment.create({
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

module.exports = router;