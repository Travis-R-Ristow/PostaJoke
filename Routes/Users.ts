import express from 'express';
import USER, { User } from '../Models/user';
import bcrypt from 'bcrypt';
import { Document, sanitizeFilter } from 'mongoose';

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
          return res.send('User created');
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
            return res.send({
              email: user.email,
              displayName: user.displayName
            });
          } else {
            return res.status(500).send('Failed to login - wrong psw');
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
