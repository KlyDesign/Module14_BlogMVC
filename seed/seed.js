const sequelize = require('../config/connection');
const { User } = require('../models');
const loginData = require('./loginData.json');
const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(loginData, {
      individualHooks: true,
      returning: true,
    });
    process.exit(0);
};

seedDatabase();