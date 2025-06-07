const mongoose = require('mongoose');
const data = require('./data');
const Listing = require('../models/listing');
const dbUrl = process.env.MONGO_ATLAS_URL;

async function initDb() {
    //delete existing data
    try {
        await Listing.deleteMany({});
        for(let listing of data) {
            const newListing = new Listing({...listing, owner: '68425d9cf493aa7198d5be15'});
            await newListing.save();
        }

        console.log('Data successfully saved in Database🚀');
    } catch(err) {
        console.log(`Error in saving database - ${err.message}`);
    }

}


//connecting to the database here
main().then(() => console.log('Database Connected Successfully🚀')).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);

  //initializing database
  initDb();
}



