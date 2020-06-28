const jwt = require('jsonwebtoken');
var connection = require('../config/config');

const authenticateToken = (req, res, next ) => {
  const authHeader = req && req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token === null || token === undefined) {
    res.json({
        status: 401,
        error: true,
        message: 'Token empty',
        data: []
        });
    return;
  }
  
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, value) => {
        if (err) {
            res.json({
                status: 403,
                error: true,
                message: 'Invalid token',
                data: []
                });
            return;
        }

      if (value.id) {
        const query = `SELECT * FROM user_table WHERE id='${value.id}'`;

        connection.pool.query(query, (err, result) => {
            if(err) {
              res.json({
                    status: 500,
                    error: true,
                    message: err,
                    data: []
                  });
              return;
            }
            else {
                if (result.rowCount === 1) {
                    req.body.userInfoId = value.id;
                    next ();
                }
                else {
                    res.json({
                            status: 403,
                            error: true,
                            message: 'Invalid token',
                            data: []
                        });
                    return;
                }

            }
        })
      }
    })
  }
}

module.exports = {
    authenticateToken
};