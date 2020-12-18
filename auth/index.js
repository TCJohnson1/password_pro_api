// const express = require('express')
// const router = express.Router()

// router.get('/', (req, res) => {
//       res.json({
//             message: "locked",
//       })
// })

// validateUser(user){
//       const validUser = typeof  user.email == 'string' && 
//       user.email.trim() !== '',

//       const validPassword = typeof user.password == "string" && 
//       user.password.trim() != '',

//       return validEmail && validPassword
// }

// router.post('/signup', (req, res, next) => {
//       if(validUser(req.body)) {
//             res.json({
//                   message: "logged in"
//             })
//       } else {
//             next(new Error('Invalid user'))
//       }
// })

// module.exports = router;