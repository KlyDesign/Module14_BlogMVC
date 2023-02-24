const User = require('./user');
const Post = require('./posts');
const Comment = require('./comment');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
  
module.exports = { User , Post , Comment };
