var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var connection = require('../config/config');
var authenticateToken = require('../middleware/middleware');


router.get('/', function(req, res, next) {
  console.log(connection, '99')
  res.send('response');
});

router.post('/sign-up', function(req, res, next) {
  try {
    const fname = req.body.first_name;
    const lname = req.body.last_name;
    const email = req.body.email;
    const pwd = md5(req.body.password);
    
    const query1 = `SELECT * FROM user_table WHERE email_='${email}'`;
    const query2 = `INSERT INTO user_table (first_name, last_name, email_, password) VALUES ('${fname}', '${lname}', '${email}', '${pwd}')`;
    
    connection.pool.query(query1, (err, result) => {
      if(err) {
        res.status(500)
            .json({
              error: true,
              message: err,
              data: []
            });
        return;
      }
      else {
        if (result.rowCount === 1) {
          res.status(200)
            .json({
              error: false,
              message: 'Email already in use',
              data: []
            });
          return;
        }
        else {
          connection.pool.query(query2, (err, result) => {
            if(err) {
              res.status(500)
                .json({
                  error: true,
                  message: err,
                  data: []
                });
              return;
            }
            else {
              res.status(200)
                .json({
                  error: false,
                  message: 'Account created successfully',
                  data: []
                });
              return;
            }
          });
        }
      }
    });
  }
  catch (err) {
    res.status(500)
       .json({
         error: true,
         message: err,
         data: []
       });
  }
})

router.post('/sign-in', function(req, res, next) {
  try {
    const email = req.body.email;
    const password = md5(req.body.password);

    const query = `SELECT * FROM user_table WHERE email_='${email}'`;

    connection.pool.query(query, (err, result) => {
      if(err) {
        res.status(500)
            .json({
              error: true,
              message: err,
              data: []
            });
        return;
      }
      else {
        if (result.rowCount === 1) {
          const userInfo = result.rows[0];

          if (userInfo.password === password) {
            let info = {};
                info.id = userInfo.id;
                info.first_name = userInfo.first_name;
                info.last_name = userInfo.last_name;
                info.time = new Date();

            const accessToken = jwt.sign(info, process.env.ACCESS_TOKEN_SECRET);
            const q1 = `UPDATE user_table SET token='${accessToken}' WHERE id=${info.id}`;

            connection.pool.query(q1, (err, result) => {
              if (err) {
                res.status(500)
                  .json({
                    error: true,
                    message: err,
                    data: []
                  })
                return;
              }
              else {
                res.status(200)
                  .json({
                    error: false,
                    message: 'Login successful',
                    accessToken: accessToken,
                    data: info
                  })
                return;
              }
            })
          }
          else {
            res.status(200)
              .json({
                error: false,
                message: 'Password incorrect',
                data: []
              })
            return;
          }
        }
        else if (result.rowCount === 0) {
          res.status(200)
           .json({
            error: false,
            message: 'User not exist',
            data: []
           })
          return;
        }
      }
    });
  }
  catch (err) {
    res.status(500)
       .json({
         error: true,
         message: err,
         data: []
       });
  }
})

router.get('/user-info', authenticateToken.authenticateToken, function(req, res, next) { //authenticateToken.authenticateToken
  try {
    const id = req.body.userInfoId;
  
    const query = `SELECT * FROM user_table WHERE id='${id}'`;

    connection.pool.query(query, (err, result) => {
      if(err) {
        res.status(500)
            .json({
              error: true,
              message: err,
              data: []
            });
        return;
      }
      else {
        if (result.rowCount === 1) {
          res.status(200)
           .json({
            error: false,
            message: 'Success',
            data: result.rows[0]
           });
          return;
        }
        else if (result.rowCount === 0) {
          res.status(200)
           .json({
            error: false,
            message: 'User not exist',
            data: []
           })
          return;
        }
      }
    });
  }
  catch (err) {
    res.status(500)
       .json({
         error: true,
         message: err,
         data: []
       });
  }
})

router.get('/receive-message', authenticateToken.authenticateToken, function(req, res, next) {
  try {
    const sender_id = req.query.sender_id;
    const receiver_id = req.query.receiver_id;
    
    const query = `SELECT * FROM chats_table WHERE (sender_id='${sender_id}' AND receiver_id='${receiver_id}') OR (sender_id='${receiver_id}' AND receiver_id='${sender_id}')`;

    connection.pool.query(query, (err, result) => {
      if(err) {
        res.status(500)
            .json({
              error: true,
              message: err,
              data: []
            });
      }
      else {
        res.status(200)
           .json({
            error: false,
            message: 'Success',
            data: result.rows
           })
      }
    });
  }
  catch (err) {
    res.status(500)
       .json({
         error: true,
         message: err,
         data: []
       });
  }
})

router.post('/send-message', function(req, res, next) {
  try {
    const senderId = req.body.sender_id;
    const receiverId = req.body.receiver_id;
    const body = req.body.message;
    const createdAt = req.body.created_at;
    
    const query = `INSERT INTO chats_table(sender_id, receiver_id, body, created_at) VALUES (${senderId},${receiverId},'${body}','${createdAt}')`;
    

    connection.pool.query(query, (err, result) => {
      if(err) {
        res.status(500)
            .json({
              error: true,
              message: err,
              data: []
            });
      }
      else {
        res.status(200)
           .json({
            error: false,
            message: 'Success',
            data: result.rows
           })
      }
    });
  }
  catch (err) {
    res.status(500)
       .json({
         error: true,
         message: err,
         data: []
       });
  }
})

router.get('/user-list', authenticateToken.authenticateToken, function(req, res, next) {
  try {
    const id = req.body.userInfoId;
    const query = `SELECT id,first_name,last_name,created_at FROM user_table  WHERE id NOT IN ('${id}') ORDER BY id DESC`;
  
    connection.pool.query(query, (err, result) => {
      if(err) {
        res.status(500)
            .json({
              error: true,
              message: err,
              data: []
            });
      }
      else {
        res.status(200)
           .json({
            error: false,
            message: 'Success',
            data: result.rows
           })
      }
    });
  }
  catch (err) {
    res.status(500)
       .json({
         error: true,
         message: err,
         data: []
       });
  }
})

module.exports = router;
