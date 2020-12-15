const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3001;
const authRoute = require('./routes/auth')
require('dotenv').config()


app.get('/', (req, res) => {
      res.send('Hi')
})

app.use(express.json())
app.use(authRoute)

app.listen(PORT, () =>{
      console.log('Listening on port', PORT)
})