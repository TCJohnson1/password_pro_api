const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
require('dotenv').config()

app.get('/', (req, res) => {
      console.log("Start")
})

app.listen(PORT, () => {
      console.log("listening on port", PORT);
});