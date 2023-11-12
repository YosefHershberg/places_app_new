"use strict";

var express = require('express');

var placesControllers = require('../controllers/places-controllers');

var _require = require('express-validator'),
    check = _require.check;

var fileUpload = require('../middleware/file-upload1');

var checkAuth = require('../middleware/check-auth');

var router = express.Router();
router.get('/:pid', placesControllers.getPlaceById);
router.get('/user/:uid', placesControllers.getPlacesByUserId);
router.use(checkAuth);
router.post('/', fileUpload.single('image'), [check('title').not().isEmpty(), check('description').isLength({
  min: 5
}), check('address').not().isEmpty()], placesControllers.createNewPlace);
router["delete"]('/:pid', placesControllers.deletePlace);
router.patch('/:pid', [check('title').not().isEmpty(), check('description').isLength({
  min: 5
})], placesControllers.updatePlace);
module.exports = router;