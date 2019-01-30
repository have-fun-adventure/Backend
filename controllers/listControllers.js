const express = require('express');
const router = express.Router();

const list = require('../models/list');

const sendNewList = (req, res) => res.json(res.locals.list);
const sendList = (req, res) => res.json(res.locals.list);
const sendUpdateList = (req, res) => res.json(res.locals.list);
router.get('/', (req, res) => res.send("lists"));


router.post('/', list.create, sendNewList);
router.put('/:id', list.update, sendUpdateList);
router.get('/:id', list.find, sendList);
router.get('/:id', list.findByUser, sendList);
router.get('/:id', list.findByActivity, sendList);



module.exports = router;