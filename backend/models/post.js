const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    postTitle: {type: String, required: true},
    postDate: {type: String, required: true},
    postUser: {type: String, required: true},
    postDescription: {type: String, required: true},
    postLocation: {type: String}
});

module.exports = mongoose.model('User', userSchema);