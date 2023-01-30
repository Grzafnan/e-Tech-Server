require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())

const client = new MongoClient(process.env.MONGODB_URI);


const Products = client.db('e-Tech').collection('Products');


async function run() {
  try {
    await client.connect();
    console.log("DB connected...");
  } catch (error) {
    console.log(error.message);
  }
}
run();


//Get Products
app.get('/products', async (req, res) => {
  try {
    const result = await Products.find().toArray();
    res.send({
      success: true,
      data: result
    })
  } catch (error) {
    console.log(error.message);
    res, send({
      success: false,
      message: error.message
    })
  }
})



//* Home route
app.get('/', (req, res) => {
  res.send(`<h1 style="color: green; text-align: center; margin-top: 20px;">Hello World!</h1>`)
})

//* Resource not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

//* Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})