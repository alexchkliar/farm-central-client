#! /usr/bin/env node
console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Pet = require('./models/pet')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var pets = []
// var genres = []
// var books = []
// var bookinstances = []

function petCreate(petName, speciesName, breedName, dob, url, cb) {
  petDetail = {name: petName, species: speciesName, breed: breedName, birthDate: dob, photo: url }
  if (dob != false) petDetail.birthDate = dob

  var pet = new Pet(petDetail);

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

// function genreCreate(name, cb) {
//   var genre = new Genre({ name: name });

//   genre.save(function (err) {
//     if (err) {
//       cb(err, null);
//       return;
//     }
//     console.log('New Genre: ' + genre);
//     genres.push(genre)
//     cb(null, genre);
//   }   );
// }

// function bookCreate(title, summary, isbn, author, genre, cb) {
//   bookdetail = {
//     title: title,
//     summary: summary,
//     author: author,
//     isbn: isbn
//   }
//   if (genre != false) bookdetail.genre = genre

//   var book = new Book(bookdetail);
//   book.save(function (err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New Book: ' + book);
//     books.push(book)
//     cb(null, book)
//   }  );
// }


// function bookInstanceCreate(book, imprint, due_back, status, cb) {
//   bookinstancedetail = {
//     book: book,
//     imprint: imprint
//   }
//   if (due_back != false) bookinstancedetail.due_back = due_back
//   if (status != false) bookinstancedetail.status = status

//   var bookinstance = new BookInstance(bookinstancedetail);
//   bookinstance.save(function (err) {
//     if (err) {
//       console.log('ERROR CREATING BookInstance: ' + bookinstance);
//       cb(err, null)
//       return
//     }
//     console.log('New BookInstance: ' + bookinstance);
//     bookinstances.push(bookinstance)
//     cb(null, book)
//   }  );
// }

function createPets(cb) {
  async.series([
    function(callback) {
      petCreate('Rufus', 'Dog', "Labrador", '2005-01-01', "https://animalso.com/wp-content/uploads/2018/04/Goldador-372x247.jpg", callback);
    },
    function(callback) {
      petCreate('Bob', 'Cat', "Scottish fold", '2015-01-01', "https://animalso.com/wp-content/uploads/2018/04/Goldador-372x247.jpg", callback);
    },
    function(callback) {
      petCreate('Cosmo', 'Cat', 'Domestic shorthair', '2020-01-01', "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-girl-cat-names-1606245046.jpg?crop=0.668xw:1.00xh;0.126xw,0&resize=980:*", callback);
    },
    function(callback) {
      petCreate('Chirp', 'Bird', "Parakeet", '2021-01-01', "https://animalso.com/wp-content/uploads/2018/04/Goldador-372x247.jpg", callback);
    },
    function(callback) {
      petCreate('Spot', 'Dog', "Hound", '2012-01-01', "https://animalso.com/wp-content/uploads/2018/04/Goldador-372x247.jpg", callback);
    },
    ],
    // optional callback
    cb);
}


// function createBooks(cb) {
//     async.parallel([
//         function(callback) {

//         },
//         ],
//         // optional callback
//         cb);
// }


// function createBookInstances(cb) {
//     async.parallel([
//         function(callback) {
//           bookInstanceCreate(books[0], 'London Gollancz, 2014.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[1], ' Gollancz, 2011.', false, 'Loaned', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[2], ' Gollancz, 2015.', false, false, callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[0], 'Imprint XXX2', false, false, callback)
//         },
//         function(callback) {
//           bookInstanceCreate(books[1], 'Imprint XXX3', false, false, callback)
//         }
//         ],
//         // Optional callback
//         cb);
// }

async.series([
    createPets,
    // createBooks,
    // createBookInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        // console.log('Pets: '+pets);

    }
    // All done, disconnect from database
    mongoose.connection.close();
});
