var db = require('../db/config');

var activity = {}; 

activity.create = function (req, res, next) {
  db.one("INSERT INTO activity (title, description, time,location, date , image ,user_id) VALUES($1, $2, $3, $4, $5) RETURNING *;",
    [ req.body.title, req.body.description, req.body.time,req.body.email, req.body.location , req.body.date , req.body.image , req.body.user_id])
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
    [req.body.title, req.body.description, req.body.time, req.body.location,req.body.date, req.body.image,req.body.user_id, req.params.id])
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
  db.manyOrNone("SELECT  users.id  from users ,activity WHERE activity.user_id =$1 and users.id=activity.user_id = RETURNING *;",
    [ req.params.id])
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