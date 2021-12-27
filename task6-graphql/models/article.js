const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        validate: {
            validator: function(value) {
              return value > 0;
            },
            message: 'price need to be > 0'
          },
        required: true,
    },
    discount: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Article', articleSchema);