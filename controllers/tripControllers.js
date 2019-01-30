const express = require('express');
const router = express.Router();

const trip = require('../models/trip');

const sendNewTrip = (req, res) => res.json(res.locals.trip);
const sendTrip = (req, res) => res.json(res.locals.trip);
const sendUpdateTrip = (req, res) => res.json(res.locals.trip);
router.get('/', (req, res) => res.send("trips"));


router.post('/', trip.create, sendNewTrip);
router.put('/:id', trip.update, sendUpdateTrip);
router.get('/:id', trip.find, sendTrip);
router.get('/:id', trip.findByUser, sendTrip);
router.get('/:id', trip.findByActivity, sendTrip);



module.exports = router;