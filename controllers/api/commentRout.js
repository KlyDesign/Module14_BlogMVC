
const router = require('express').Router();
const { Post , User , Comment} = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/:id', withAuth, async (req, res) => {
try{
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  const postData = await Post.findAll({
          where: {
              post_id: req.body.post_id
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
  res.json(posts)
  res.render('dash', {
          posts,
          logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    console.log("MEW COMMENT CREATED")
    const newComment = await Comment.create({
      description_comment: req.body.description_comment,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

  
module.exports = router;