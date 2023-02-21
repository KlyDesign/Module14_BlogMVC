const router = require("express").Router();
const withAuth = require('../utils/auth');

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

router.get('/profile', withAuth, async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] }
    });
    const user = userData.get({ plain: true });
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;