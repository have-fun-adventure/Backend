const pgPromise = require('pg-promise');
const pgInstance = pgPromise();

const config = {
  host: 'localhost',
  port: 5432,
  database: 'have_fun',
  user: 'aishahalmaghrbi' 
}

const connection = pgInstance(config);

module.exports = connection;