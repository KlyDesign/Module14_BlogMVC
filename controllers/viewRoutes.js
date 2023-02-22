const router = require("express").Router();
const withAuth = require('../utils/auth');
const { User } = require('../models');

router.get("/", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    res.render("homepage",{
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

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;