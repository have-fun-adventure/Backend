const express = require('express');
const router = express.Router();

const activity = require('../models/activity');

const sendNewActivity = (req,res) => res.json(res.locals.activity);
const sendActivity = (req, res) => res.json(res.locals.activity);
const sendUpdateActivity = (req, res) => res.json(res.locals.activity);
const sendAllActivity = (req, res) => res.json(res.locals.activity);
// router.get('/', (req, res) => res.send("activity"));


router.get('/' , activity.getAll , sendAllActivity)
router.post('/', activity.create, sendNewActivity);
router.put('/:id', activity.update, sendUpdateActivity);
router.get('/:id', activity.find, sendActivity);
router.get('/:id', activity.findByUser, sendActivity);


module.exports = router;