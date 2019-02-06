require("dotenv").config();

const express = require('express');
const port = 3000;
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require("cors")
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.send(' hey have fun ');
})

const usersController = require('./controllers/usersControllers');
app.use('/user', usersController);

const activityController = require('./controllers/activityControllers');
app.use('/activity', activityController);

const listController = require('./controllers/listControllers');
app.use('/list', listController);

const authController = require("./controllers/authController");
app.use("/auth", authController);



app.listen(port, () => {
  console.log('---------------------------------------');
  console.log('Express listening on localhost:' + port);
  console.log('---------------------------------------');
});


