const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Offer schema
const offerSchema = new Schema({
    amount: { type: Number, required: true, min: 0.01 },
    status: { type: String, enum: ['pending', 'rejected', 'accepted'], default: 'pending' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    item: { type: Schema.Types.ObjectId, ref: 'Event' }
}, { timestamps: true });

// Define the Offer model
const Offer = mongoose.model('Offer', offerSchema);

// Export the Offer model
module.exports = Offer;