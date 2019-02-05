var db = require('../db/config');

var list = {};

list.create = function (req, res, next) {
  db.one("INSERT INTO list (name, note, activity_id, user_id) VALUES($1, $2, $3, $4) RETURNING *;",
    [req.body.name, req.body.note, req.body.activity_id, req.body.user_id])
    .then(result => {
      res.locals.list = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

list.find = function (req, res, next) {
  db.one("SELECT * FROM list WHERE id=$1;",
    [req.params.id])
    .then(result => {
      res.locals.list = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

list.update = function (req, res, next) {
  db.one("UPDATE list SET name=$1, note=$2, activity_id=$3, user_id=$4 WHERE id=$5 RETURNING *;",
    [req.body.name, req.body.note, req.body.activity_id, req.body.user_id, req.params.id])
    .then(result => {
      res.locals.list = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

list.delete = function (req, res, next) {
  db.none('DELETE FROM list WHERE id=$1;', [req.params.id])
    .then(() => {
      console.log('successful delete');
      next();
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

list.findByUser = function (req, res, next) {
  db.manyOrNone("SELECT  * from users ,list WHERE list.user_id =$1 and users.id=list.user_id  RETURNING *;",
    [req.params.id])
    .then(result => {
      res.locals.list = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

list.findByActivity = function (req, res, next) {
  db.manyOrNone("SELECT  * from activity, list WHERE list.activity_id =$1 and activity.id=$1;",
    [req.params.activity_id])
    .then(result => {
      res.locals.lists = [result];
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}



module.exports = list;