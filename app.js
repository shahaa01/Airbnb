const express = require('express');
const app = express();
const PORT = 8080;
const mongoose = require('mongoose');
const Listing = require('./model/listing.js');

//connecting the database
main().then(() => console.log('Database connected successfully🚀')).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');

    //route to check things
  app.get('/', (req, res) => {
    res.send('Everything is working fine.')
  });

  app.get('/testListing', async (req, res) => {
    let place1 = new Listing({
      title : "Kathmandu Inn",
      description : "Best hotels in Kathmandu",
      price: 2500,
      location: "Kathmandu, Tinkune",
      country: "Nepal",
      space: "entire place"
    });

    try {
      await place1.save();
      res.send(await Listing.find({}));
    } catch(err) {
      console.log(`The error in testListing is: ${err}`);
    }
  });

  app.get()
}

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
})