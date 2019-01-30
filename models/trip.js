var db = require('../db/config');

var trip = {}; 

trip.create = function (req, res, next) {
  db.one("INSERT INTO trip (name, location, activity_id, user_id) VALUES($1, $2, $3, $4) RETURNING *;",
    [ req.body.name, req.body.note, req.body.activity_id,req.body.user_id])
    .then(result => {
      res.locals.trip = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

trip.find = function (req, res, next) {
  db.one("SELECT * FROM trip WHERE id=$1;",
    [req.params.id])
    .then(result => {
      res.locals.trip = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

trip.update = function (req, res, next) {
  db.one("UPDATE trip SET name=$1, location=$2, activity_id=$3, user_id=$4 WHERE id=$5 RETURNING *;",
    [req.body.name, req.body.location, req.body.activity_id ,req.body.user_id, req.params.id])
    .then(result => {
      res.locals.trip = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

trip.findByUser = function (req, res, next) {
  db.manyOrNone("SELECT  users.id  from users ,trip WHERE trip.user_id =$1 and users.id=trip.user_id = RETURNING *;",
    [ req.params.id])
    .then(result => {
      res.locals.trip = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

trip.findByActivity = function (req, res, next) {
  db.manyOrNone("SELECT  activity.id  from activity ,trip WHERE trip.user_id =$1 and activity.id=trip.user_id = RETURNING *;",
    [ req.params.id])
    .then(result => {
      res.locals.trip = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}



module.exports = trip;