const UserController = {

   
    renderItemPage: (req, res) => {
        res.render('pages/item');
    },

    renderItemsPage: (req, res) => {
        res.render('pages/items');
    },

    renderNewPage: (req, res) => {
        res.render('pages/new');
    }
};

module.exports = UserController;
