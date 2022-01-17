#! /usr/bin/env node
require('dotenv').config()
console.log('Running seed');

const async = require('async')
const Food = require('./models/food')
const User = require('./models/user')
const Cart = require('./models/cart')
const Order = require('./models/order')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pomqy.mongodb.net/food_central`;

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

const foods = []
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
      deleteEntries(Food, callback);
    },
    function(callback) {
      deleteEntries(User, callback);
    },
    function(callback) {
      deleteEntries(Cart, callback);
    },
    function(callback) {
      deleteEntries(Order, callback);
    },
    ],
    // optional callback
    cb);
}

function foodCreate(name, units, category, location, quantity, price, seller, photo, rating, cb) {
  foodDetail = {name: name, units: units, category: category, location: location, quantity: quantity, seller: seller, price:price, photo: photo, rating: rating }
  // if (dob != false) foodDetail.birthDate = dob
  const food = new Food(foodDetail);
  food.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Food: ' + food);
    foods.push(food)
    cb(null, food)
  });
}

function createFoods(cb) {
  async.series([
    function(callback) { foodCreate("Almonds", "500g", "Other", "Burnaby, BC", 45, 3.98, users[1], "../food_img/057. almonds.jpg", 4.3, callback); },
    function(callback) { foodCreate("Apricots", "8 units", "Fruit", "Sudbury, ON", 125, 8, users[2], "../food_img/036. apricots.jpg", 4.7, callback); },
    function(callback) { foodCreate("Asparagus", "50 units", "Vegetable", "Sainte-Julienne, QC", 2, 4, users[0], "../food_img/019. asparagus.jpeg", 4.2, callback); },
    function(callback) { foodCreate("Avocado", "6 units", "Vegetable", "Nanaimo, BC", 118, 5, users[1], "../food_img/050. avocado.jpg", 4.5, callback); },
    function(callback) { foodCreate("Bananas", "5 units", "Fruit", "Sainte-Julienne, QC", 15, 8, users[1], "../food_img/031. banana.jpg", 3.7, callback); },
    function(callback) { foodCreate("Blackberries", "350g", "Fruit", "Cloyne, ON", 157, 5, users[1], "../food_img/037. blackberries.jpg", 3.2, callback); },
    function(callback) { foodCreate("Blackcurrant", "500g", "Fruit", "Kelowna, BC", 76, 3.98, users[0], "../food_img/051. blackcurrant.jpg", 3.8, callback); },
    function(callback) { foodCreate("Blueberries", "400g", "Fruit", "Granby, QC", 62, 4.99, users[0], "../food_img/032. blueberries.jpg", 4.8, callback); },
    function(callback) { foodCreate("Brazilian nuts", "1kg", "Other", "Calabogie, ON", 5, 4.95, users[2], "../food_img/056. brazilian_nuts.jpg", 4.5, callback); },
    function(callback) { foodCreate("Broccoli", "500g", "Vegetable", "Sudbury, ON", 33, 3.99, users[0], "../food_img/006. broccoli.jpg", 4.2, callback); },
    function(callback) { foodCreate("Brussel sprouts", "20 units", "Vegetable", "Joliette, QC", 54, 5.95, users[0], "../food_img/021. brussel_sprouts.jpeg", 5, callback); },
    function(callback) { foodCreate("Cabbage", "1 unit", "Vegetable", "Granby, QC", 148, 5, users[1], "../food_img/022. cabbage.jpg", 4.7, callback); },
    function(callback) { foodCreate("Carrots", "24 units", "Vegetable", "Kelowna, BC", 104, 4.95, users[2], "../food_img/001. carrots.jpg", 4, callback); },
    function(callback) { foodCreate("Celery", "400g", "Vegetable", "Joliette, QC", 33, 9.99, users[0], "../food_img/009. celery.jpg", 4.1, callback); },
    function(callback) { foodCreate("Cherries", "500g", "Fruit", "Thunder Bay, ON", 193, 5.95, users[0], "../food_img/044. cherries.jpg", 4.7, callback); },
    function(callback) { foodCreate("Coriander", "125g", "Vegetable", "Timmins, ON", 98, 2.98, users[0], "../food_img/048. coriander.jpg", 4, callback); },
    function(callback) { foodCreate("Courgette", "1 unit", "Vegetable", "Cloyne, ON", 26, 3, users[1], "../food_img/020. courgette.jpg", 3.4, callback); },
    function(callback) { foodCreate("Cucumbers", "5 units", "Vegetable", "Kelowna, BC", 1, 3.95, users[2], "../food_img/002. cucumbers.jpg", 4.6, callback); },
    function(callback) { foodCreate("Dill", "100g", "Vegetable", "Joliette, QC", 199, 3.95, users[2], "../food_img/047. dill.jpg", 4.2, callback); },
    function(callback) { foodCreate("Dragonfruits", "3 units", "Fruit", "Sudbury, ON", 49, 5.99, users[0], "../food_img/046. dragonfruit.jpg", 5, callback); },
    function(callback) { foodCreate("Eggplants", "1 unit", "Vegetable", "Saint-Jean-sur-Richelieu, QC", 126, 3, users[1], "../food_img/024. eggplant.jpg", 4.4, callback); },
    function(callback) { foodCreate("Eggs", "12 units", "Other", "Joliette, QC", 188, 6.98, users[1], "../food_img/053. eggs.jpg", 3.1, callback); },
    function(callback) { foodCreate("Garlic", "4 cloves", "Vegetable", "Timmins, ON", 76, 8, users[2], "../food_img/011. garlic.jpg", 3.5, callback); },
    function(callback) { foodCreate("Apples", "5 units", "Fruit", "Cloyne, ON", 146, 6, users[2], "../food_img/039. golden_delicious_apple.jpg", 3.2, callback); },
    function(callback) { foodCreate("Grapefruits", "6 units", "Fruit", "Cloyne, ON", 169, 6.99, users[1], "../food_img/035. grapefruit.jpg", 3.9, callback); },
    function(callback) { foodCreate("Grapes", "500g", "Fruit", "Cloyne, ON", 7, 3.99, users[0], "../food_img/045. grapes.jpg", 3.2, callback); },
    function(callback) { foodCreate("Grapes", "250g", "Fruit", "Kelowna, BC", 155, 5.95, users[1], "../food_img/049. grape.jpg", 3.8, callback); },
    function(callback) { foodCreate("Green beans", "5 units", "Vegetable", "Thunder Bay, ON", 126, 4.49, users[1], "../food_img/014. green_beans.jpeg", 4.7, callback); },
    function(callback) { foodCreate("Green chilis", "150g", "Vegetable", "Sudbury, ON", 116, 5, users[2], "../food_img/013. green_chili.jpg", 4.8, callback); },
    function(callback) { foodCreate("Green peppers", "5 units", "Vegetable", "Cloyne, ON", 200, 5, users[2], "../food_img/018. green_pepper.jpeg", 3.1, callback); },
    function(callback) { foodCreate("Iceberg lettuce", "1 unit", "Vegetable", "Sudbury, ON", 161, 2.98, users[2], "../food_img/004. iceberg_lettuce.jpg", 3.7, callback); },
    function(callback) { foodCreate("Kale", "275g", "Vegetable", "Cloyne, ON", 194, 6.49, users[2], "../food_img/007. kale.jpg", 4.9, callback); },
    function(callback) { foodCreate("Kiwi", "8 units", "Fruit", "Granby, QC", 175, 4, users[1], "../food_img/041. kiwi.jpg", 4, callback); },
    function(callback) { foodCreate("Mangos", "6 units", "Fruit", "Sudbury, ON", 166, 3, users[1], "../food_img/042. mango.jpg", 3.4, callback); },
    function(callback) { foodCreate("Mushrooms", "300g", "Other", "Ferme-Neuve, QC", 28, 5.95, users[2], "../food_img/052. mushrooms.jpg", 3.6, callback); },
    function(callback) { foodCreate("Oranges", "6 units", "Fruit", "Sudbury, ON", 36, 6, users[1], "../food_img/029. orange.jpg", 3.6, callback); },
    function(callback) { foodCreate("Parsley", "100g", "Vegetable", "Ferme-Neuve, QC", 43, 3.99, users[1], "../food_img/025. parsley.jpg", 3.1, callback); },
    function(callback) { foodCreate("Pears", "10 units", "Fruit", "Sainte-Julienne, QC", 48, 7.99, users[0], "../food_img/040. pears.jpg", 4.9, callback); },
    function(callback) { foodCreate("Plums", "12 units", "Fruit", "Saint-Jean-sur-Richelieu, QC", 163, 5, users[1], "../food_img/043. plum.jpg", 3.5, callback); },
    function(callback) { foodCreate("Radishes", "12 units", "Vegetable", "Thunder Bay, ON", 6, 5, users[1], "../food_img/003. radishes.jpg", 5, callback); },
    function(callback) { foodCreate("Raspberries", "400g", "Fruit", "Granby, QC", 10, 6, users[2], "../food_img/033. raspberries.jpg", 4.3, callback); },
    function(callback) { foodCreate("Red cabbage", "1 unit", "Vegetable", "Sainte-Julienne, QC", 122, 5.99, users[2], "../food_img/023. red_cabbage.jpg", 4.8, callback); },
    function(callback) { foodCreate("Red onions", "6 units", "Vegetable", "Granby, QC", 49, 3.79, users[2], "../food_img/017. red_onion.jpg", 4, callback); },
    function(callback) { foodCreate("Red peppers", "6 units", "Vegetable", "Calabogie, ON", 135, 7.99, users[0], "../food_img/012. red_pepper.jpg", 3.2, callback); },
    function(callback) { foodCreate("Romaine lettuce", "1 unit", "Vegetable", "Thunder Bay, ON", 124, 2.99, users[0], "../food_img/005. romaine_lettuce.jpg", 3.2, callback); },
    function(callback) { foodCreate("Shallot onions", "12 units", "Vegetable", "Granby, QC", 12, 3, users[0], "../food_img/016. shallot_onion.jpg", 3.3, callback); },
    function(callback) { foodCreate("Spinach", "375g", "Vegetable", "Cloyne, ON", 136, 4.29, users[1], "../food_img/026. spinach.jpg", 4, callback); },
    function(callback) { foodCreate("Strawberries", "500g", "Fruit", "Joliette, QC", 3, 9, users[0], "../food_img/034. strawberries.jpg", 4, callback); },
    function(callback) { foodCreate("Sunflower seeds", "250g", "Other", "Burnaby, BC", 166, 7.95, users[0], "../food_img/054. sunflower_seeds.jpg", 4.4, callback); },
    function(callback) { foodCreate("Tangerines", "20 units", "Fruit", "Nanaimo, BC", 182, 5, users[1], "../food_img/030. tangerine.jpg", 3.9, callback); },
    function(callback) { foodCreate("Tomatoes", "6 units", "Fruit", "Burnaby, BC", 42, 4, users[1], "../food_img/008. tomato.jpg", 3.8, callback); },
    function(callback) { foodCreate("Turnips", "12 units", "Vegetable", "Saint-Jean-sur-Richelieu, QC", 179, 5.3, users[2], "../food_img/010. turnip.jpeg", 3.5, callback); },
    function(callback) { foodCreate("Walnuts", "125g", "Other", "Calabogie, ON", 104, 5, users[0], "../food_img/055. walnuts.jpg", 3.7, callback); },
    function(callback) { foodCreate("Watercress", "200g", "Vegetable", "Joliette, QC", 177, 4.99, users[0], "../food_img/027. watercress.jpg", 4.4, callback); },
    function(callback) { foodCreate("Watermelon", "1 unit", "Fruit", "Sainte-Julienne, QC", 32, 6, users[0], "../food_img/028. watermelon.jpg", 4.8, callback); },
    function(callback) { foodCreate("White onions", "6 units", "Vegetable", "Sainte-Julienne, QC", 150, 5.99, users[0], "../food_img/015. white_onion.jpg", 4.4, callback); },
    ],
  cb);
}

function userCreate(name, username, password, google_sub_id, callback) {
  userDetail = { name: name, username: username, password: password, google_sub_id: google_sub_id }
  const user = new User(userDetail);

  user.save(function (err) {
    if (err) {
      console.log(err)
      callback(err, null)
      return
    }
    console.log('New User: ' + user);
    users.push(user)
    callback(null, user)
  });
}

function createUsers(cb) {
  async.series([
    function(callback) {
      bcrypt.hash('123', 10).then((passwordHash) => {
        userCreate('Joe', '123', passwordHash, "ng", callback);
      });
    },
    function(callback) {
      bcrypt.hash('1234', 10).then((passwordHash) => {
        userCreate('Dave', '1234', passwordHash, "ng", callback);
      });
    },
    function(callback) {
      bcrypt.hash('12345', 10).then((passwordHash) => {
        userCreate('Frank', '12345', passwordHash, "ng", callback);
      });
    }
    ],
  cb);
}

async.series([
    deleteAllEntries,
    createUsers,
    createFoods,
    createFoods,
    createFoods,
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
