const router = require("express").Router();
const withAuth = require('../utils/auth');
const { User, Post } = require('../models');

router.get("/", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    const viewData = await Post.findAll({
      attributes: [
          'id',
          'title',
          'description',
          'date_created'
      ],
      include: [
          {
              model: User,
              attributes: ['name']
          }
      ]
  })
  const view = viewData.map(post => post.get({plain: true}));
  res.render("homepage",{
    view,
    logged_in: true
  });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login')
});

module.exports = router;