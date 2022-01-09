#! /usr/bin/env node
require('dotenv').config()
console.log('Running seed');

const async = require('async')
const Pet = require('./models/pet')
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pomqy.mongodb.net/pet_central`;

mongoose.connect(mongoDB, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const pets = []
const users = []

function deleteEntries(model, cb) {
  model.deleteMany({}, (error, data) => {
    if (error) {
      console.log(error)
      cb(err, null)
    } else {
      console.log(data)
      cb(null, model)
    }
  })
}

function deleteAllEntries(cb) {
  async.series([
    function(callback) {
      deleteEntries(Pet, callback);
    },
    function(callback) {
      deleteEntries(User, callback);
    },
    ],
    // optional callback
    cb);
}

function petCreate(petName, speciesName, breedName, dob, url, cb) {
  petDetail = {name: petName, species: speciesName, breed: breedName, birthDate: dob, photo: url }
  if (dob != false) petDetail.birthDate = dob

  const pet = new Pet(petDetail);

  pet.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Pet: ' + pet);
    pets.push(pet)
    cb(null, pet)
  });
}

function createPets(cb) {
  async.series([
    function(callback) {
      petCreate('Rufus', 'Dog', "Labrador", 99, users[0], "https://animalso.com/wp-content/uploads/2018/04/Goldador-372x247.jpg", callback);
    },
    function(callback) {
      petCreate('Bob', 'Cat', "Scottish fold", 5, users[0], "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-girl-cat-names-1606245046.jpg?crop=0.668xw:1.00xh;0.126xw,0&resize=980:*", callback);
    },
    function(callback) {
      petCreate('Cosmo', 'Cat', 'Domestic shorthair', 4, users[0], "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-girl-cat-names-1606245046.jpg?crop=0.668xw:1.00xh;0.126xw,0&resize=980:*", callback);
    },
    function(callback) {
      petCreate('Chirp', 'Bird', "Parakeet", 1, users[0], "https://www.photoblog.com/learn/wp-content/uploads/2019/08/says-phoebe-bird-1024x683.jpg", callback);
    },
    function(callback) {
      petCreate('Spot', 'Dog', "Hound", 55, users[1], "https://animalso.com/wp-content/uploads/2018/04/Goldador-372x247.jpg", callback);
    }
    ],
  cb);
}

function userCreate(uName, pWord, gSub, cb) {
  userDetail = { username: uName, password: pWord, google_sub_id: gSub }
  const user = new User(userDetail);

  user.save(function (err) {
    if (err) {
      console.log(err)
      cb(err, null)
      return
    }
    console.log('New User: ' + user);
    users.push(user)
    cb(null, user)
  });
}

function createUsers(cb) {
  async.series([
    function(callback) {
      bcrypt.hash('123', 10).then((passwordHash) => {
        userCreate('123', passwordHash, "ng", callback);
      });
    },
    function(callback) {
      bcrypt.hash('1234', 10).then((passwordHash) => {
        userCreate('1234', passwordHash, "ng", callback);
      });
    },
    function(callback) {
      bcrypt.hash('12345', 10).then((passwordHash) => {
        userCreate('12345', passwordHash, "ng", callback);
      });
    }
    ],
  cb);
}

async.series([
    deleteAllEntries,
    createUsers,
    createPets,
    createPets,
    createPets,
    createPets,
    createPets,
    createPets,
    createPets,
    createPets,
    createPets,
    createPets,
  ],
  function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
      // results
    }
    mongoose.connection.close();
});
