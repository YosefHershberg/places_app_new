const axios = require('axios')
const HttpError = require('../models/http-error')

const API_KEY = process.env.GOOGLE_API_KEY

async function getCoordinatesForAddress(address) {
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)

    // console.log(data.results[0].geometry);

    if (!data || data.status == 'ZERO_RESULTS') {
        const error = new HttpError('could not find location for the specified address. Try again', 422)
        throw error
    }

    const coordinates = data.results[0].geometry.location

    return coordinates
}

module.exports = getCoordinatesForAddress;