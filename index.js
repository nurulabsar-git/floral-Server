// external modules
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const filesUpload = require('express-fileupload');
const fs = require("fs-extra");
require('dotenv').config()

/*Use this site key in the HTML code your site serves to users.
Copy Site key:    6Lfn5OgbAAAAAN3sZBkkUU2YCrPR6IoDgWQ5rBJL

Use this secret key for communication between your site and reCAPTCHA
 Copy Secret key: 6Lfn5OgbAAAAAL2M4WXxqsK0Lwx8u2x0RCmhwYUf
*/


//  cors and body parser
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(filesUpload())

// console.log(process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
// `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.b9ncf.mongodb.net:27017,cluster0-shard-00-01.b9ncf.mongodb.net:27017,cluster0-shard-00-02.b9ncf.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-d3k6d4-shard-0&authSource=admin&retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b9ncf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log("error:", err);
  const collection = client.db("foodsName").collection("foods");
  const vegetableConnection = client.db("foodsName").collection("vegetable");
  console.log("database connected successfully");


app.post('/post', (req, res) => {
const postData = req.body;
collection.insertOne(postData)
.then(result => {
  console.log(result);
  res.send(result.insertedCount > 0)
})
  
})

app.get('/get', (req, res) => {
  collection.find()
  .toArray((error, data) => {
    res.send(data)
  });
})

//

app.post('/addItem', (req, res) => {

  const name = req.body.name;
  const file = req.files.image;
  const weight = req.body.weight;
  const price = req.body.price;
  const details = req.body.details;
  const filePath = `${__dirname}/reviews/${file.name}`;
  const newImg = file.data;
  const convertedImg = newImg.toString('base64')


  const image = {
    contentType: file.mimetype,
    size: file.size,
    img: Buffer.from(convertedImg, "base64"),
  }

   vegetableConnection.insertOne({name, image, weight, price, details})
   .then(result => {
     res.send(result.insertedCount > 0)
   });
})

app.get("/services", (req, res) => {
 vegetableConnection.find({}).toArray((err, documents) => {
    res.send(documents);
  });
});



});


app.get('/', (req, res) => {
  res.send('Server can not Responded yet')
})

app.listen(process.env.PORT || 5000, ()=> {
  console.log('http://localhost:5000/');
})


// b@ngladesh1160Abs@r##NMR << Oracle for java jdk 
// 01b@ngladesh1160Abs@r##NM10R << UPeapole

// #bangladesh1160Rif@t##R# <<<heroku

