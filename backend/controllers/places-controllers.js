const fs = require('fs');
const HttpError = require('../models/http-error')
const { validationResult } = require('express-validator')
const getCoordinatesForAddress = require('../util/location')
const { v4: uuidv4 } = require('uuid')
const Place = require('../models/place')
const User = require('../models/user')
const { default: mongoose } = require('mongoose')

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid

    let place
    try {
        place = await Place.findById(placeId) // can add .exec() for the method to return a promise
    } catch (err) {
        const error = new HttpError('Could not find place by id, Try again', 500)
        return next(error)
    }

    if (!place) {
        const error = new HttpError('Could not find a place for the provided id', 404)
        return next(error);
    }

    res.json({ place: place.toObject({ getters: true }) })
}

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid

    let userWithplaces;
    try {
        userWithplaces = await User.findById(userId).populate('places')
        // console.log(userWithplaces);
    } catch (err) {
        const error = new HttpError('could not find places with that user id, Try again', 500)
        return next(error)
    }

    if (!userWithplaces || userWithplaces.length === 0) {
        return next(new HttpError('Could not find a places for the provided user', 404));
    }

    res.json({ places: userWithplaces.places.map(p => p.toObject({ getters: true })) })
}

const createNewPlace = async (req, res, next) => {

    console.log('ss');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { title, description, address, image } = req.body

    let coordinates;
    try {
        coordinates = await getCoordinatesForAddress(address)
    } catch (error) {
        console.log(error);
        return next(error)
    }

    const createdPlace = new Place({
        // id: uuidv4(),
        title,
        description,
        location: coordinates,
        // image: req.file.path,
        image,
        address,
        creator: req.userData.userId,
    })

    let user;
    try {
        user = await User.findById(req.userData.userId)
    } catch (err) {
        console.log(err);
        const error = new HttpError('Finding user failed, try again', 500)
        return next(error)
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id, try again', 404)
        return next(error)
    }

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdPlace.save({ session: sess })
        user.places.push(createdPlace)
        await user.save({ session: sess })
        await sess.commitTransaction()
    } catch (err) {
        const error = new HttpError('Failed to create place, please try again', 500)
        console.log(err);
        return next(error)
    }
    // DUMMY_PLACES.push(createdPlace)

    res.status(201).json({ place: createdPlace.toObject({ getters: true }) })
}

const updatePlace = async (req, res, next) => {

    // await new Promise((resolve) => {
    //     setTimeout(resolve, 2000);
    // });

    // const error = new HttpError('You are not allowed to delete this place.', 401);
    // return next(error);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { title, description } = req.body
    const placeId = req.params.pid

    let place;
    try {
        place = await Place.findById(placeId)
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not update place becuse it was not found', 500)
        console.log(err);
        return next(error)
    }

    if (place.creator.toString() !== req.userData.userId) {
        const error = new HttpError('You are not autherized to edit this place', 401)
        return next(error)
    }

    place.title = title;
    place.description = description;

    try {
        await place.save()
    } catch (err) {
        const error = new HttpError('Something went wrong. Could not update place', 500)
        console.log(err);
        return next(error)
    }

    res.status(200).json({ place: place.toObject({ getters: true }) })
}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid

    let place;
    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete place.',
            500
        );
        return next(error);
    }

    if (place.creator.id !== req.userData.userId) {
        const error = new HttpError('You are not allowed to delete this place.', 401);
        return next(error);
    }

    try {
        place = await Place.findByIdAndDelete(placeId).populate('creator')
        place.creator.places.pull(place);
        await place.creator.save()
    } catch (err) {
        const error = new HttpError('Failed to delete place. try again', 500)
        console.log(err);
        return next(error)
    }

    const imagePath = place.image;

    if (!place) {
        return next(new HttpError('Could not find place for this ID, Try again', 404))
    }

    fs.unlink(imagePath, (err) => {
        console.log(err);
    })

    res.status(200).json({ message: 'Place was deleted', place })
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createNewPlace = createNewPlace
exports.deletePlace = deletePlace
exports.updatePlace = updatePlace
