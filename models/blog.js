const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// design the schema or the structure of a collection
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    dateOfCreation: {
        type: String,
        required: true
    }
}, {timestamps: true});

// create a model based on the schema designed
const BlogModel = mongoose.model('blog', blogSchema);

module.exports = BlogModel;