const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

//Get Post by id
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    res.render("comment", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/post", async (req, res) => {
  res.render("newPost");
});

//Displays post in descending order by date posted
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["postDate", "DESC"]],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Dashboard route must be logged in
router.get("/dashboard", withAuth, (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/login");
    return;
  }
  res.render("post");
});

//Comment route
router.get("/comment", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("comment");
});

module.exports = router;
