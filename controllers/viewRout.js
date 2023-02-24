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

module.exports = router;