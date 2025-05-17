const mongoose = require('mongoose');
const data = require('./data');
const Listing = require('../models/listing');

async function initDb() {
    //delete existing data
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(data);

        console.log('Data successfully saved in Database🚀');
    } catch(err) {
        console.log(`Error in saving database - ${err.message}`);
    }

}


//connecting to the database here
main().then(() => console.log('Database Connected Successfully🚀')).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');

  //initializing database
  initDb();
}



