const router = require("express").Router();
const withAuth = require('../utils/auth');
const { User , Post, Comment } = require('../models');

router.get('/', withAuth, async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    console.log(user)
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/view', withAuth, async (req, res) => {
try{
  const postData = await Post.findAll({
          where: {
              user_id: req.session.user_id
          },
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
      const posts = postData.map(post => post.get({plain: true}));
          console.log(posts)
          res.render('dash', {
              ...posts,
              loggedIn: true
          });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
