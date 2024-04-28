const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('./itemModel'); // Replace with the actual path to your Item model




const itemSchema = new Schema({
    title: { type: String, required: true },
    seller: { type: String, required: true },
    condition: { type: String, required: true },
    price: { type: Number, required: true },
    details: { type: String, required: true },
    image: { type: String, required: true },
    totalOffers: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    highestOffer: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Event', itemSchema, 'events');






// Function to get all items


exports.getItemById = (itemId) => {
    console.log('itemId:', itemId); // Log the itemId
    const item = items.find(item => item.id === itemId);
    console.log('item:', item); // Log the item found
    return item;
};
// Function to delete an item

exports.deleteItem = (itemId) => {
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) {
        items.splice(index, 1);
        return true; // Item deleted successfully
    }
    return false; // Item not found
};
// Function to search for items using a fuzzy search algorithm
exports.searchItems = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase(); // Convert search term to lowercase for case-insensitive search
    const searchResults = items.filter(item => {
        const title = item.title.toLowerCase(); // Convert item title to lowercase
        const words = searchTerm.split(' '); // Split search term into words
        // Check if each word in the search term is found in the item title
        return words.every(word => title.includes(word));
    });
    return searchResults;
};
exports.addItem = (newItem) => {
    newItem.id = items.length + 1;
    items.push(newItem);
};
