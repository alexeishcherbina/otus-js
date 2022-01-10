const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: {
        type: [{type: Schema.Types.ObjectId, ref: 'Article'}],
        required: true
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Order', orderSchema);