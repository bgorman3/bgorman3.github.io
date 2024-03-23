const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

const path = require('path');
const userRoutes = require('./routes/UserRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

let port = 4000;
let host = 'localhost';
let url = 'mongodb+srv://bgorman3:joelewis88@cluster0.feevi6q.mongodb.net/nbda-project3';

app.set('view engine', 'ejs');

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/public/images', express.static(path.join(__dirname, 'public', 'images')));
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/', userRoutes);

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
