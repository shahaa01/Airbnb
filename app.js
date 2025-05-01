const express = require('express');
const app = express();
const PORT = 8080;
const mongoose = require('mongoose');

//connecting the database
main().then(() => console.log('Database connected successfully🚀')).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}


//route to check things
app.get('/', (req, res) => {
    res.send('Everything is working fine.')
})


app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
})