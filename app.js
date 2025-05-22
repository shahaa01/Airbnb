const express = require('express');
const mongoose = require('mongoose');
const PORT = 8080;
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const Listing = require('./models/listing');
const engine = require('ejs-mate');

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
app.get('/airbnbClone', async (req, res) => {

  try {
    const data = await Listing.find({});
    res.render('pages/index', {
      data
    });
  } catch(err) {
    console.log(`Error in showing the lists - ${err.message}`);
  }

});

//route to show individual listing
app.get('/individualListing/:id', async(req, res) => {

  try {
    const {id} = req.params;
    const requiredListing = await Listing.findById(id);  
    res.render('pages/individualList', {list: requiredListing});
  } catch(err) {
    console.log(`Error in individual Listing route - ${err.message}`);
  }

});

//route to get edit form 
app.get('/editList/:id', async (req, res) => {
  const {id} = req.params;
  const requiredListing = await Listing.findById(id);
  res.render('pages/editForm', {listing: requiredListing});
});

//route to update from the edit form
app.put('/editList/:id', async (req, res) => {
  try {
      const {id} = req.params;
      const requiredListing = await Listing.findByIdAndUpdate(id, req.body.listing);
      res.redirect(`/individualListing/${id}`);
  } catch(err) {
    console.log(`Error in update route - ${err.message}`);
  }

});

//route to show add new list form
app.get('/addList', async (req, res) => {
  res.render('pages/newListingForm');
});

//route to add in the db
app.post('/addList', async(req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect('/airbnbClone');
});

//route to delete
app.delete('/deleteList/:id', async(req, res) => {
  try {
      const {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect('/airbnbClone')
  } catch(err) {
    console.log(`Error in delete route - ${err.message}`);
  }

});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});