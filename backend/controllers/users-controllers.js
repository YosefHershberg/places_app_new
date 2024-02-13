const bcrypt = require('bcryptjs')
const HttpError = require('../models/http-error')
const { validationResult } = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS) || 1;

const getUsersList = async (req, res, next) => {
    let users;

    try {
        users = await User.find({}, '-password')
    } catch (err) {
        const error = new HttpError('Fetching failed. Try again later', 500)
        return next(error)
    }

    res.status(200).json({ users: users.map(u => u.toObject({ getters: true })) })
}

const signup = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { name, email, password, image } = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        console.log(err);
        const error = new HttpError('Failed to check if user is already signed in, please try again later', 500)
        return next(error)
    }

    if (existingUser) {
        return next(new HttpError('This email is already used. plaese try again or log in', 422))
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (err) {
        const error = new HttpError("could not creat user. please try again", 500)
        return next(error)
    }

    let newUser = new User({
        name,
        email,
        hashedPassword,
        // image: req.file.path,
        image,
        places: [],
    })

    try {
        await newUser.save()
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not create user', 500)
        console.log(err);
        return next(error)
    }

    let token;
    try {
        token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            process.env.JWT_KEY,
            { expiresIn: `${expirationTime}h` },
        )
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not create token', 500)
        console.log(err);
        return next(error)
    }

    res.cookie('access_token', token, { maxAge: expirationTime * 60 * 60000, httpOnly: false });
    res.status(201).json({
        user: newUser.toObject({ getters: true }),
    })
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        console.log(err);
        const error = new HttpError('Failed to check if user is has account, please try again later', 500)
        return next(error)
    }

    if (!existingUser) {
        return next(new HttpError('Invalid credentials, please re-enter email and password', 403))
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.hashedPassword)
    } catch (err) {
        const error = new HttpError('Could not log you in. Please check your credetials', 500)
        return next(error)
    }

    if (!isValidPassword) {
        return next(new HttpError('Invalid credentials, please re-enter email and password', 403))
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            process.env.JWT_KEY,
            { expiresIn: `${expirationTime}h` },
        )
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not create token', 500)
        console.log(err);
        return next(error)
    }

    res.cookie('access_token', token, { maxAge: expirationTime * 60 * 60000, httpOnly: false });
    res.status(200).json({
        user: existingUser.toObject({ getters: true }),
    })
}

exports.getUsersList = getUsersList
exports.signup = signup
exports.login = login