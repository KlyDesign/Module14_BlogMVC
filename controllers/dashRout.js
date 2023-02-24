const router = require("express").Router();
const withAuth = require('../utils/auth');
const { User , Post, Comment } = require('../models');

router.get('/newPost', withAuth, async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    console.log(user)
    res.render('newPost', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/view', withAuth, async (req, res) => {
try{
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
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
      res.render('dash', {
              posts,
              logged_in: true
          });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:id', withAuth, async (req, res) => {
  try{
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    const editPost = await Post.findOne({
            where: {
                id: req.params.id
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
      const ePost = editPost.get({ plain: true });
      res.render('editPost', {
          ...ePost,
          logged_in: true
      });
      }
      catch(err) {
          console.log(err);
          res.status(500).json(err);
      }
});

module.exports = router;
