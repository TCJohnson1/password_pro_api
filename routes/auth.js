const express = require('express')
const bcrypt = require('bcrypt')
const {pool} = require('../connect')
const Router = express.Router()
const authMiddleware = require('../middleware/auth')
const { validateUser, isInvalidField, generateAuthToken } = require('../tokens');

Router.post('/signup', async (req, res) => {
      try{
            const {firstName, lastName, email, password } = req.body;
            const validFieldsToUpdate = [
                  'firstName',
                  'lastName',
                  'email',
                  'password'
            ]
            const receivedFields = Object.keys(req.body)

            const isInvalidFieldProvided = isInvalidField(
                  receivedFields,
                  validFieldsToUpdate
            );

            if (isInvalidFieldProvided) {
                  return res.status(400).send({
                        signup_error: 'Invalid field.'
                  })
            }
            const result = await pool.query(
                  'select count(*) as count from account_user where email =$1', [email]
            )
            const count = result.rows[0].count;
            if (count > 0) {
                  return res.status(400).send({
                        signup_error: 'User with this email address already exists.'
                  })
            }

            const hashedPassword = await bcrypt.hash(password, 8);
            await pool.query(
                  'insert into account_user(firstName, lastName, email, password) values($1, $2, $3, $4)',
                  [firstName, lastName, email, hashedPassword]
            )
            res.status(201).send()
      }catch (error) {
            res.status(400).send({
                  signup_error: 'Error while signing up. Try again.'
            })
      }
})


Router.post('/signin', async (req, res) => {
      try{
            const {email, password} = req.body
            const user = await validateUser(email, password);
            if (!user) {
                  res.status(400).send({
                        signin_error: 'Email/password does not match'
                  })
            }
            const token = await generateAuthToken(user)
            const result = await pool.query(
                  'insert into tokens(access_token, userid) values($1, $2) returning *', [token, user.userid]
            )
            if (!result.rows[0]) {
                  return res.status(400).send({
                        signin_error: 'Error while signing in. Try again.'
                  })
            }
            user.token = result.rows[0].access_token;
            res.send(user)
      } catch (error) {
            res.status(400).send ({
                  signin_error: 'Email/password does not match.'
            })
      }
})

Router.post('/logout', authMiddleware, async (req, res) => {
      try{
            const {userid, access_token } = req.user;
            await pool.query('delete from tokens where userid=$1 and access_token=$2', [
                  userid,
                  access_token
            ])
            res.send()
      } catch (error) {
            res.status(400).send({
                  logout_error: 'Error while logging out. Try again.'
            })
      }
})

module.exports = Router;