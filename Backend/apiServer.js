var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/itemStore');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error'));
//SESSIONS 
app.use(session({
  secret: 'mySecretString', 
  saveUninitialized: false, 
  resave: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}))

app.post('/cart', function(req, res) {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err) {
    if(err) {
      console.log('# API POST CART SESSION:', err);
    }
    res.json(req.session.cart);
  })
});

app.get('/cart', function(req, res) {
  if(typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});

var Items = require('./models/items.js');

//POST ITEMS 
app.post('/items', function(req, res) {
  var item = req.body; 

  Items.create(item, function(err, items) {
    if(err) {
      throw err;
    }
    res.json(items); 
  })
});
//END 

//GET ITEMS
app.get('/items', function(req, res) {
  Items.find(function(err, items) {
    if(err) {
      throw err; 
    }
    res.json(items); 
  })
})
//END 

//DELETE ITEMS 
app.delete('/items/:_id', function(req, res) {
  var query = {_id: req.params._id};

  Items.remove(query, function(err, items) {
    if(err) {
      throw err; 
    }
    res.json(items); 
  })
});
//END

//PUT ITEMS 
app.put('/items/:_id', function(req, res) {
  var item = req.body;
  var query = req.params._id;

  var update = {
    '$set': {
      name: item.name, 
      description: item.description,
      price: item.price,
      images: item.images
    }
  }

  var options = {new: true};

  Items.findOneAndUpdate(query, update, options, function(err, items) {
    if(err) {
      throw err;      
    }
    res.json(items);
  })

});

app.listen(3001, function(err){
  if(err) {
    return console.log(err)
  }
  console.log('API server is listening on http://localhost:3001')
})
