const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
require('dotenv').config()
const db = require('./db/index')

//Middleware
app.use(express.json())

//GET all passwords
app.get('/api/v1/passwords', async (req, res) => {
      const results = await db.query('select * from passwords')
      console.log(results)
      res.status(200).json({
            status: "success",
            data:{
                  pasword: "Jim"
            }
            
      })
})

//Get one password
app.get('/api/v1/passwords/:id', (req, res) => {
      console.log(req.params)

      res.status(200).json({
            status: "success",
            data: {
                  website: "google.com",
                  username: "Tim_Jones",
                  email: "tim@jones.com",
                  password: "TJONES1"
            }
      })
})

//Create Route
app.post('/api/v1/passwords', (req, res) =>{
      console.log(req.body)

      res.status(201).json({
            status: "success",
            data: {
                  website: "google.com",
                  username: "Tim_Jones",
                  email: "tim@jones.com",
                  password: "TJONES1"
            }
      })
})

//Update route
app.put('/api/v1/passwords/:id',(req, res) => {
      console.log(req.params.id)
      console.log(req.body)

      res.status(200).json({
            status: "success",
            data: {
                  website: "google.com",
                  username: "Tim_Jones",
                  email: "tim@jones.com",
                  password: "TJONES1"
            }
      })
})

//Delete route
app.delete('/api/v1/passwords/:id', (req, res) => {
      res.status(204).json({
            status: "success",
      })
})

app.listen(PORT, () => {
      console.log("listening on port", PORT);
});

