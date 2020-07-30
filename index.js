const config  = require('config');

const port = config.get('port') || 3000;
const app  = require('./startup/app');

//Startup
const logger = require('./startup/logging');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  logger.info(`listening on port ${port}`);
});



