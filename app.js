const express = require('express');
const mongoose = require('mongoose');
const PORT = 8080;
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const Listing = require('./models/listing');
const engine = require('ejs-mate');
const ExpressErr = require('./errors/expressErr');
const asyncWrap = require('./utils/asyncWrap');
const listings = require('./routes/listing');

//Lets set ejs and required middlewares here
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true})); //to parse form data
app.use(express.json()); //for JSON data
app.engine('ejs', engine); //to set ejs as ejs-mate

//connecting to the database here
main().then(() => console.log('Database Connected Successfully🚀')).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

//routes here
app.use('/listing', listings);

//this is error handling middleware which only handles sync errors - for async we used asyncWrap Functions
app.use((err, req, res, next) => {
  let {status = 500, message = "Something went wrong, we are extremely sorry!", redirectLink} = err;
  res.status(status).render('pages/error', {errMessage: err.message, errStatus: status, link: redirectLink});
});

app.use((req, res) => {
  res.status(404).render('pages/error', {errStatus: 404, errMessage: "Invalid URL! Page Not Found", link: "/listing"});
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
