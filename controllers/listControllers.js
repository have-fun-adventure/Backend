const express = require('express');
const router = express.Router();

const list = require('../models/list');

const sendNewList = (req, res) => res.json(res.locals.list);
const sendList = (req, res) => res.json(res.locals.list);
const sendUpdateList = (req, res) => res.json(res.locals.list);
const sendLists = (req, res) => res.json(res.locals.lists);
const sendSuccess = (req, res) => res.json({ message: "success" })
router.get('/', (req, res) => res.send("lists"));


router.post('/', list.create, sendNewList);
router.put('/:id', list.update, sendUpdateList);
router.get('/activity/:activity_id', list.findByActivity, sendLists);
router.get('/:id', list.find, sendList);
router.get('/:id', list.findByUser, sendList);
router.delete('/:id', list.delete, sendSuccess)



module.exports = router;