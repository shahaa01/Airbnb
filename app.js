const express = require('express');
const mongoose = require('mongoose');
const PORT = 8080;
const app = express();
const path = require('path');
const Listing = require('./models/listing');

//lets set ejs and required middlewares here
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//connecting to the database here
main().then(() => console.log('Database Connected Successfully🚀')).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

//routes here
app.get('/home', (req, res) => {
  res.send("Hii Everything is working fine.");
});

app.get('/showListings', async (req, res) => {

  try {
    const data = await Listing.find({});
    res.render('index', {data});
  } catch(err) {
    console.log(`Error in showing the lists - ${err.message}`);
  }

})


app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});