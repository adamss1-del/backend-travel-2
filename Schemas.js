const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const DestinationSchema = new mongoose.Schema({
    id: String,
    country: String,

    title: { type: String, required: true },
    desc: String,
    img: String,

    dining: String,

    months: [
        {
            month: String,
            weather: String,
            temperature: String,
            season: String,
            activities: [String],
            bestPlaces: [String]
        }
    ]
});

module.exports = {
    User: mongoose.model('User', UserSchema),
    Destination: mongoose.model('Destination', DestinationSchema)
};
