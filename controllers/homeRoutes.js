const router = require("express").Router();
const session = require("express-session");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

//Get Post by id
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("post", {
      ...post,
      loggedIn: req.session.loggedIn,
    });

    // res.render("comment", {
    //   ...post, //Should this be post?
    //   loggedIn: req.session.loggedIn,
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

//New Comment route
router.get("/comment", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("comment");
});

router.get("/post/update/:id", async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
      },
      {
        model: Comment,
      },
    ],
  });

  const post = postData.get({ plain: true })
  if(session.user_id !== post.user_id) {
    res.redirect('/login')
  } else {
    res.render('postUpdate', {post, session})
  }
});

//Displays posts in descending order by date posted on homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
        },
      ],
      order: [["postDate", "DESC"]],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

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
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Dashboard route must be logged in
router.get("/dashboard", withAuth, async (req, res) => {
  // try {
    const userPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
        }
      ],
    });

    const user = await userPosts.map(post => {
      return post.get({ plain: true })
    });
    console.log(user)

    res.render("dashboard", {
      user,
      loggedIn: true,
    });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

module.exports = router;
