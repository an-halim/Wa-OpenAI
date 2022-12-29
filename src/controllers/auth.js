const User = require('../models/user');
const { Op } = require('sequelize');
const nanoId = require('nanoid');
const nanoid = require('nanoid');

const auth = {
  login: async (req, res) => {
    const { phone, password } = req.body;
    try {
      User.findOne({
        where: {
          [Op.and]: [
            phone,
            password,
          ]
        }
      }).then((user) => {
        if (user) {
          const token = 500;
          user.update({
            token: token
          }).then((user) => {
            res.status(200).json({
              message: 'Login success',
              data: {
                user: user,
                token: token
              }
            });
          }).catch((error) => {
            res.status(500).json({
              message: 'Login failed',
              data: {
                error: error
              }
            });
          });
        } else {
          res.status(404).json({
            message: 'User not found',
            data: {}
          });
        }
      }).catch((error) => {
        res.status(500).json({
          message: 'Login failed',
          data: {
            error: error
          }
        });
      });
    } catch (error) {
      res.status(500).json({
        message: 'Login failed',
        data: {
          error: error
        }
      });
    }
  },
  register: async (req, res) => {
    const { name, username, password, phone } = req.body;
    console.log(req.body);
    const role = 'user';
    const status = 'inactive';
    const id = nanoid();
    console.log(id);
    try {
      User.create({
        name: name,
        username: username,
        password: password,
        phone: phone,
        role: role,
        status: status,
        otp: id,
      }).then((user) => {
        res.status(200).json({
          message: 'Register success',
          data: {
            user: user
          }
        });
      }).catch((error) => {
        console.log(error);
        res.status(500).json({
          message: 'Register failed',
          data: {
            error: error
          }
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Register failed',
        data: {
          error: error
        }
      });
    }
  },
  verify: async (req, res) => {
    const { token } = req.body;
    try {
      User.findOne({
        where: {
          otp: token
        }
      }).then((user) => {
        if (user) {
          user.update({
            status: 'active',
            otp: null
          }).then((user) => {
            res.status(200).json({
              message: 'Verify success',
              data: {
                user: user
              }
            });
          }).catch((error) => {
            res.status(500).json({
              message: 'Verify failed',
              data: {
                error: error
              }
            });
          });
        } else {
          res.status(404).json({
            message: 'User not found or token invalid',
            data: {}
          });
        }
      }).catch((error) => {
        res.status(500).json({
          message: 'Verify failed',
          data: {
            error: error
          }
        });
      });
        
    } catch (error) {
      res.status(500).json({
        message: 'Verify failed',
        data: {
          error: error
        }
      });
    }
  }
}

module.exports = auth;