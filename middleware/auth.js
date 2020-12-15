const jwt = require('jsonwebtoken')
const { pool } = require('../connect')

const authMiddleware = async function (req, res, next) {
      try {
            const token = req.header(Authorizarion).split('')[1]
            const decoded = jwt.verify(token, process.env.secret);
            const result = await pool.query(
                  'select b.userid,b.firstName,b.lastName, b.email, t.access_token from account_user b inner join tokens t on b.userid=t.userid where t.access_token=$1 and t.userid=$2',[token, decoded.userid]
            )
            const user = result.rows[0];
            if (user) {
                  req.user = user;
                  req.token = token;
                  next();
            } else {
                  throw new Error('Authentication Error')
            }
      } catch (error) {
            res.status(400).send ({
                  auth_error:'Authentication failed.'
            })
      }
}

module.exports = authMiddleware;