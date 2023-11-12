const express = require('express')
const usersControllers = require('../controllers/users-controllers')
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload1')
const router = express.Router()

router.get('/', usersControllers.getUsersList)

router.post(
    '/signup',
    fileUpload.single('image'),
    [
        check('name').not().isEmpty(),
        // check('image').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    usersControllers.signup
)

router.post('/login', usersControllers.login)

module.exports = router