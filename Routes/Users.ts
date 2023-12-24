import express from 'express';
import USER from '../Models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sanitizeFilter } from 'mongoose';

const userRoute = express.Router();

userRoute.route('/create-user').post(async (req, res) => {
  console.log('create-user', req.body);

  bcrypt.hash(req.body.psw, 7.2, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Failed to create user');
    }

    if (hash) {
      const newUser = new USER({
        displayName: req.body.displayName,
        psw: hash,
        email: req.body.email
      });
      newUser
        .save()
        .then((savedUser) => {
          console.log(savedUser);
          const tokenObj = {
            displayName: savedUser.displayName,
            eml: savedUser.email,
            id: savedUser._id
          };
          const accessToken = jwt.sign(tokenObj, 'testPSW');

          return res.send({
            displayName: savedUser.displayName,
            email: savedUser.email,
            token: accessToken
          });
        })
        .catch((e) => {
          console.log(e);
          return res.status(500).send('Failed to create user');
        });
    }
  });
});

userRoute.route('/login').post((req, res) => {
  console.log('login', req.body);

  USER.findOne({ email: sanitizeFilter(req.body.email) })
    .then((user) => {
      if (!user) {
        console.log('Error:: Failed to find user');
        return res.status(500).send('Failed to login');
      }
      bcrypt
        .compare(req.body.psw, user.psw ?? '')
        .then((isMatch) => {
          if (isMatch) {
            const tokenObj = {
              displayName: user.displayName,
              eml: user.email,
              id: user._id
            };
            const accessToken = jwt.sign(tokenObj, 'testPSW');

            return res.send({
              displayName: user.displayName,
              email: user.email,
              token: accessToken
            });
          } else {
            return res.status(500).send('Failed to login');
          }
        })
        .catch((e) => {
          console.log(e);
          return res.status(500).send('Failed to login');
        });
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).send('Failed to login');
    });
});

export default userRoute;
