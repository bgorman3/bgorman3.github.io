// Require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const storyRoutes = require('./routes/pageRoutes');

// Create Express app
const app = express();

// Configure app
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
app.set('view engine', 'ejs');

// Mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// Set up routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/stories', storyRoutes);

// Error handling middleware
app.use((req, res, next) => {
    const err = new Error(`The server cannot locate ${req.url}`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).render('error', { error: { status, message } });
});

// Start the server
app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
