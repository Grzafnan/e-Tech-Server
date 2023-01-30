require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;








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