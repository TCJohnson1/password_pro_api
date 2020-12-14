const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3001;


app.get('/', (req, res) => {
      res.send('Hi')
})

app.listen(PORT, () =>{
      console.log('Listening on port', PORT)
})