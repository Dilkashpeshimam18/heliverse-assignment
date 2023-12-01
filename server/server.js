const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const fs = require('fs');
const User=require('./models/user')

const jsonData = fs.readFileSync('./data/user.json', 'utf8');
const users = JSON.parse(jsonData);

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
dotenv.config()

mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true },
).then(() => console.log('Connected to db successfully'))
    .catch((err) => { console.error(err); });


app.use('/user', userRoutes)

const isDataIncluded = async () => {
    try {
      const count = await User.countDocuments();
      return count > 0;
    } catch (error) {
      console.error('Error checking database:', error);
      return false;
    }
  };
  
  isDataIncluded().then((alreadySeeded) => {
    if (!alreadySeeded) {
      User.insertMany(users)
        .then(() => console.log('Database seeded successfully'))
        .catch((err) => console.error('Error seeding database:', err));
    } 
  });
  

app.listen(4000, () => {
    console.log('SERVER RUNNING!!')
})