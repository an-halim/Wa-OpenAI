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
            {phone},
            {password},
          ]
        }
      }).then((user) => {
        if (user) {
          if (user.status === 'inactive') {
            return res.status(400).json({
              message: 'User not active',
              data: {}
            });
          }
          res.status(200).json({
            message: 'Login success',
            data: {
              user: user
            }
          });
        } else {
          res.status(404).json({
            message: 'User not found',
            data: {}
          });
        }
      }).catch((error) => {
        console.log(error)
        res.status(500).json({
          message: 'Login failed',
          data: {
            error: error
          }
        });
      });
    } catch (error) {
      console.log(error)
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
    const role = 'user';
    const status = 'inactive';
    const otp = nanoid();
    const token = 500;
    try {
      let [result] = await global.client.onWhatsApp(phone);
      if (!result?.exists) {
        res.status(400).json({
          message: 'Register failed',
          data: {
            error: 'Phone number not valid'
          }
        });
        return;
      }
      User.create({
        name: name,
        username: username,
        password: password,
        phone: phone,
        role: role,
        status: status,
        otp: otp,
        token: token
      }).then(async (user) => {
        let ms = await global.client.sendMessage( phone + "@s.whatsapp.net", {
          text: `Your OTP is ${otp}`
        });
        console.log(ms);                             
        res.status(200).json({
          message: 'Register success',
          data: {
            user: user
          }
        });
      }).catch((error) => {
        res.status(400).json({
          message: 'Register failed',
          data: {
            error: error
          }
        });
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: 'Register failed',
        data: {
          error: error
        }
      });
    }
  },
  verify: async (req, res) => {
    const { code } = req.query;
    try {
      User.findOne({
        where: {
          otp: code
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