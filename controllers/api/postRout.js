
const router = require('express').Router();
const { Post , User , Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    console.log("MEW POST CREATED")
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try{
    const editPost = await Post.update({
      title: req.body.title,
      content: req.body.description,
      }, 
        {
          where: {
              id: req.params.id,
          },
      })
    if (!editPost) {
      res.status(404).json({ message: '404 not found' });
      return;
    }
    res.status(200).json(editPost);
  }
    catch (err) {
      res.status(500).json(err);
    }
});


router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;