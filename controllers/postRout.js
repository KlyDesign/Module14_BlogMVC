const router = require("express").Router();
const withAuth = require('../utils/auth');
const { User , Post, Comment } = require('../models');

router.get('/:id', withAuth, async (req, res) => {
    try{
      if (!req.session.logged_in) {
        res.redirect('/login');
        return;
      }
    const viewPost = await Post.findOne({
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
              model: Comment,
              attributes: ['id', 'description_comment', 'post_id', 'user_id', 'date_created'],
              model: User,
              attributes: ['name']
            }
        ]
        })
    const vPost = viewPost.get({ plain: true });
    const commentData = await Comment.findAll({
        where: {
            post_id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['name']
            }
        ]
    })
    const comments = commentData.map(comment => comment.get({plain: true}));
    console.log(vPost, comments)
    res.render('postView', {
        ...vPost,
        comments,
        logged_in: true
    });
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
    });
  
module.exports = router;