const express = require('express');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

const product = require('./routes/product.route'); // Imports routes for the products

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set up mongoose connection
const uri = "mongodb+srv://<dbuser>:<password>@<clustername>-dx50k.mongodb.net/<dbname>?retryWrites=true";
let mongoDB = process.env.MONGODB_URI || uri;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/products', product);

app.listen(3000, function() {
    console.log('server running on port 3000')
});

// Set up mongodb connection
// const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//     if(err) return console.log(err);
//         db = client.db("crudnode")

//     app.listen(3000, function() {
//          console.log('server running on port 3000')
//     });
// });

app.get('/products', (req, res) => {
    res.render('index.ejs', {data:''});
});

app.get('/', (req, res) => {
    res.redirect('/products');
});