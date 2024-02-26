const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');
const items = [
    {


        id: 1,
        title: 'Nice Nissan',
        seller:  'Anish Venkatesh',
        condition: "New",
        price: 1179.99,
        details: 'Personal Collecton',
        image: "/images/car7.png",
        totalOffers: 2,
        active: true
       

    },

    {
        id: 2,
        title: 'Pretty Porsche',
        seller:  'Mills Sullivan',
        condition: "Very good",
        price: 139.99,
        details: 'Stylish Collection',
        image: "/images/car16.png",
        totalOffers: 3,
        active: true
    }
    ,

    {
        id: 3,
        title: 'Cool Corvette',
        seller:  'Mills Sullivan',
        condition: "Good",
        price: 19.00,
        details: 'Sexy Collecton',
        image: "/images/car2.png",
        totalOffers: 10,
        active: true
    }
    ,

    {
        id: 4,
        title: 'Strong Subaru',
        seller:  'John Lee',
        condition: "New",
        price: 15.00,
        details: 'Sexy Collecton',
        image: "/images/car21.png",
        totalOffers: 11,
        active: true
    }
    ,

    {
        id: 5,
        title: 'Majestic Mazda',
        seller:  'Brendan Gorman',
        condition: "New",
        price: 105.00,
        details: 'Stylish Collecton',
        image: "/images/car9.png",
        totalOffers: 12,
        active: true
    }
    ,

    {
        id: 5,
        title: 'Beloved BMW',
        seller:  'Connor Wilson',
        condition: "New",
        price: 5.00,
        details: 'Stylish Collecton',
        image: "/images/car20.png",
        totalOffers: 12,
        active: true
    }
       
];

// Function to get all items
exports.getAllItems = () => {
    return items;
};

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

/*
this method works
module.exports = {
    find: () => auctionitems,
    findById: id => auctionitems.find(item => item.id === id),
    save: function(item) {
        item.id = uuidv4();
        item.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
        auctionitems.push(item);
    },
    updateById: function(id, newItem) {
        let item = auctionitems.find(item => item.id === id);
        if (item) {
            item.title = newItem.title;
            item.condition = newItem.condition;
            return true;
        } else {
            return false;
        }
    }
};


/*
module.exports.auctionitems = auctionitems;
const sortedItems = auctionitems.sort((a, b) => a.price - b.price);
module.exports = sortedItems;

module.exports = {
    find: () => auctionitems,
    findById: id => auctionitems.find(item => item.id == id),
    save: function(item) {
        item.id = uuidv4();
        item.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
        auctionitems.push(item);
    },
    updateById: function(id, newItem) {
        let item = auctionitems.find(item => item.id === id);
        if (item) {
            item.title = newItem.title;
            item.condition = newItem.condition;
            return true;
        } else {
            return false;
        }
    }
};
*/



/*

 id: 1,
        title: 'Nice Nissan',
        collection: 'Personal Collecton',
        condition: 'New',
        price: 1, // Just the price value
        offers: 10,
        seller: 'Anish Venkatesh',
        photographer: 'Connor Wilson',
        image: '/images/car7.png',
        dateTaken: DateTime.local(2023,2,12,18,0).toLocaleString(DateTime.DATETIME_SHORT),
        brand: 'Nissan'      
        
        
         id: 2,
        title: 'Pretty Porsche',
        collection: 'Stylish Collection',
        condition: 'Very Good',
        price: 15, // Just the price value
        offers: 3,
        seller: 'Mills Sullivan',
        photographer: 'Connor Wilson',
        image: '/images/car16.png',
        dateTaken: DateTime.local(2021,3,4,12,0).toLocaleString(DateTime.DATETIME_SHORT),
        brand: 'Porsche'      
        
    },
    {
        id: 3,
        title: 'Cool Corvette',
        collection: 'Sexy Collecton',
        condition: 'New',
        price: 10, // Just the price value
        offers: 10,
        seller: 'Ian McCauley',
        photographer: 'Connor Wilson',
        image: '/images/car2.png',
        dateTaken: DateTime.local(2022,4,5,1,0).toLocaleString(DateTime.DATETIME_SHORT),
        brand: 'Chevrolet'       

    }
    ,
    {
        id: 4,
        title: 'Strong Subaru',
        collection: 'Sexy Collecton',
        condition: 'New',
        price: 15, // Just the price value
        offers: 11,
        seller: 'John Lee',
        photographer: 'Connor Wilson',
        image: '/images/car21.png',
        dateTaken: DateTime.local(2023,6,16,12,0).toLocaleString(DateTime.DATETIME_SHORT),
        brand: 'Subaru'       

    }
    ,
    {
        id: 5,
        title: 'Majestic Mazda',
        collection: 'Stylish Collecton',
        condition: 'Great',
        price: 20, // Just the price value
        offers: 3,
        seller: 'Brendan Gorman',
        photographer: 'Connor Wilson',
        image: '/images/car9.png',
        dateTaken: DateTime.local(2023,12,20,5,0).toLocaleString(DateTime.DATETIME_SHORT),
        brand: 'Mazda'       

    }
    ,
    {
        id: 6,
        title: 'Beloved BMW',
        collection: 'Serious Collecton',
        condition: 'Used',
        price: 8, // Just the price value
        offers: 6,
        seller: 'Semeon Petros',
        photographer: 'Connor Wilson',
        image: '/images/car20.png',
        dateTaken: DateTime.local(2024,1,16,3,0).toLocaleString(DateTime.DATETIME_SHORT),
        brand: 'BMW'       

    }
    */