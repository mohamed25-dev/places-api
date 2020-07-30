const db = require('../models/index');
const logger = require('../startup/logging');

db.sequelize.sync({ alter: false }).then(() => {
  logger.info('db is ready');
});

