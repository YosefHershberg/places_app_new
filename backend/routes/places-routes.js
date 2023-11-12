const express = require('express')
const placesControllers = require('../controllers/places-controllers')
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload1')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()

router.get('/:pid', placesControllers.getPlaceById)

router.get('/user/:uid', placesControllers.getPlacesByUserId)

router.use(checkAuth);

router.post(
    '/',
    fileUpload.single('image'),
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty()
    ],
    placesControllers.createNewPlace
)

router.delete('/:pid', placesControllers.deletePlace)

router.patch(
    '/:pid',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
    ],
    placesControllers.updatePlace)

module.exports = router