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

//lets set ejs and required middlewares here
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
app.get('/', (req, res) => {
  res.send("Hii Everything is working fine.");
});

//home route - which will show all the listings 
app.get('/airbnbClone', asyncWrap(async (req, res) => {
    const data = await Listing.find({});
    res.render('pages/index', {
      data
    });
}));

//route to show individual listing
app.get('/individualListing/:id', asyncWrap(async(req, res, next) => {

    const {id} = req.params;
    const requiredListing = await Listing.findById(id); 
    if(!requiredListing) {
      next(new ExpressErr(400, "URL is incorrect. Page not Found."));
    } 
    res.render('pages/individualList', {list: requiredListing});


}));

//route to get edit form 
app.get('/editList/:id', asyncWrap(async (req, res, next) => {
  const {id} = req.params;
  const requiredListing = await Listing.findById(id);
  if(!requiredListing) {
    next(new ExpressErr(400, "URL is incorrect. Page not Found."));
  } 
  res.render('pages/editForm', {listing: requiredListing});
}));

//route to update from the edit form
app.put('/editList/:id', asyncWrap(async (req, res, next ) => {

      const {id} = req.params;
      if(!req.body.listing) {
        next(new ExpressErr(400, "No listing found. Bad Request"));
      }
      const requiredListing = await Listing.findByIdAndUpdate(id, req.body.listing);
      if(!requiredListing) {
        next(new ExpressErr(400, "Something went wrong - User ID is missing"));
      }
      res.redirect(`/individualListing/${id}`);


}));

//route to show add new list form
app.get('/addList', asyncWrap(async (req, res, next) => {
  res.render('pages/newListingForm');
}));

//route to add in the db
app.post('/addList', asyncWrap(async(req, res, next) => {
   if(!req.body.listing) {
    next(new ExpressErr(400, "No listing Found.", "/addList"));
  }
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect('/airbnbClone');
}));

//route to delete
app.delete('/deleteList/:id', asyncWrap(async(req, res, next) => {

  const {id} = req.params;
  if(!(Listing.findById(id))) {
    next(new ExpressErr(400, "Something went wrong - User Id not Found."));
  }
  await Listing.findByIdAndDelete(id);
  res.redirect('/airbnbClone')


}));

//this is error handling middleware which only handles sync errors - for async we used asyncWrap Functions
app.use((err, req, res, next) => {
  let {status = 500, message = "Something went wrong, we are extremely sorry!", redirectLink} = err;
  res.status(status).render('pages/error', {errMessage: err.message, errStatus: status, link: redirectLink});
});

app.use((req, res) => {
  res.status(404).render('pages/error', {errStatus: 404, errMessage: "Invalid URL! Page Not Found", link: "/airbnbClone"});
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});