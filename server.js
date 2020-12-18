const express = require('express')
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 3001
require('dotenv').config()
const db = require('./db/index')
const auth = require('./auth')

//Middleware
// app.use('/auth', auth)
app.use(cors())
app.use(express.json())

//GET all passwords
app.get('/api/v1/passwords', async (req, res) => {
      try{
            const results = await db.query('select * from passwords')
            res.status(200).json({
            status: "success",
            results: results.rows.length,
            data:{
                  passwords: results.rows,
            }
            
      })
      } catch (err) {
            console.log(err)
      }
})

//Get one password
app.get('/api/v1/passwords/:id', async (req, res) => {
      console.log(req.params.id);
      try {
            const results = await db.query("select * from passwords where website = $1", [req.params.id]);
            res.status(200).json({
                  status: "success",
                  data: {
                        passwords: results.rows[0],
                  }
            })
      } catch (err){
            console.log(err)
      }
})

//Create Route
app.post('/api/v1/passwords', async (req, res) =>{
      console.log(req.body)
      try{
            const results = await db.query("INSERT INTO passwords (website, username, email, password) values ($1, $2, $3, $4) returning *", [req.body.website, req.body.username, req.body.email, req.body.password])
            console.log(results)
            res.status(201).json({
                  status: "success",
                  data: {
                        website: 'Google',
                        username: "Test",
                        email: "tim@tim.com",
                        password: "TJONES1"
                  }
            })
      } catch (err){
            console.log(err)
      }
})

//Update route
app.put('/api/v1/passwords/:id', async (req, res) => {

      try{
            const results = await  db.query("UPDATE passwords SET website = $1, username = $2, email = $3, password = $4 where id = $5 returning *", [req.body.website, req.body.username, req.body.email, req.body.password, req.params.id])
            res.status(200).json({
                  status: "success",
                  data: {
                        passwords: results.rows[0]
                  }
            })
      } catch (err) {
            console.log(err)
      }
      console.log(req.params.id)
      console.log(req.body)
})

//Delete route
app.delete('/api/v1/passwords/:id', async (req, res) => {
      try{
            const results = await db.query("DELETE FROM passwords where id = $1", [req.params.id])
            res.status(204).json({
                  status: "success",
            })
      } catch (err){
            console.log(err)
      }
})

app.listen(PORT, () => {
      console.log("listening on port", PORT);
});

