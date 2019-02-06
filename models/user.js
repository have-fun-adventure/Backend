var db = require('../db/config');
var bcrypt = require("bcrypt");
var user = {};

user.login = (req, res, next) => {
  db.one("SELECT * FROM users WHERE email = $1;", [req.body.email])
    .then(function (result) {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        req.user = result;
      }
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    });
};

user.findEmail = (req, res, next) => {
  db.oneOrNone("SELECT * FROM users WHERE email=$1;", [req.body.email])
    .then(function (result) {
      res.user = result;
      next();
    })
    .catch(function (error) {
      console.log(error);
      next();
    });
};




user.create = function (req, res, next) {
  console.log("\n\n\n\n\n\n\n", req.body)

  const salt = bcrypt.genSaltSync(10);
  db.one("INSERT INTO users (username, firstname, lastname, email,password, phone , gender ,location) VALUES($1, $2, $3, $4, $5 ,$6 ,$7 ,$8) RETURNING *;",
    [req.body.username.toLowerCase(), req.body.firstname, req.body.lastname, req.body.email.toLowerCase(), bcrypt.hashSync(req.body.password, salt), req.body.phone, req.body.gender, req.body.location])
    .then(result => {
      req.user = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

user.find = function (req, res, next) {
  db.one("SELECT * FROM users WHERE username=$1;",
    [req.params.username])
    .then(result => {
      res.locals.user = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

user.update = function (req, res, next) {
  db.one("UPDATE users SET username=$1, firstname=$2, lastname=$3, email=$4, password=$5, phone=$6 , gender=$7,location=$8, WHERE id=$9 RETURNING *;",
    [req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.phone, req.body.gender, req.body.location, req.params.id])
    .then(result => {
      res.locals.user = result;
      next()
    })
    .catch(error => {
      console.log(error);
      next();
    })
}

module.exports = user;