var db = require('../db/config');

var activity = {};



activity.getAll = function (req, res, next) {
  db.manyOrNone("SELECT * FROM activity ")
    .then(result => {
      res.locals.activity = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

activity.create = function (req, res, next) {
  console.log('*********');
  console.log(req);
  db.one("INSERT INTO activity (title, description, time, location, date , image ,user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
    [req.body.title, req.body.description, req.body.time, req.body.location, req.body.date, req.body.image, req.body.user_id])
    .then(result => {
      res.locals.activity = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

activity.find = function (req, res, next) {
  db.one("SELECT * FROM activity WHERE id=$1;",
    [req.params.id])
    .then(result => {
      res.locals.activity = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

activity.update = function (req, res, next) {
  db.one("UPDATE activity SET title=$1, description=$2, time=$3, location=$4, date=$5 , image=$6 ,user_id=$7, WHERE id=$8 RETURNING *;",
    [req.body.title, req.body.description, req.body.time, req.body.location, req.body.date, req.body.image, req.body.user_id, req.params.id])
    .then(result => {
      res.locals.activity = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}
activity.findByUser = function (req, res, next) {
  db.manyOrNone("SELECT * from users ,activity WHERE activity.user_id =$1 and activity.id=$1 ;",
    [req.params.id])
    .then(result => {
      res.locals.activity = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

activity.createUser = function (req, res, next) {
  console.log(req);
  db.one("INSERT INTO usersActivity (activity_id,user_id) VALUES($1, $2) RETURNING *;",
    [req.body.activity_id, req.body.user_id])
    .then(result => {
      res.locals.activity = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
  }

activity.allUsersActivity = function (req, res, next) {
  db.manyOrNone("SELECT username from usersActivity, users  WHERE usersActivity.user_id = users.id and usersActivity.activity_id=$1;",
    [req.params.activity_id])
    .then(result => {
      res.locals.activity = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}


module.exports = activity;