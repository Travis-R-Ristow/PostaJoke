import JOKE from '../Models/joke';
import express from 'express';
import { Joke } from '../Models/joke';
const jokeRoute = express.Router();

jokeRoute.route('/getJoke').get(async (req, res) => {
  const getJokes: Error | Joke[] = await JOKE.find();
  console.log(getJokes);
  // if (getJokes.error) {
  //     console.log(getJokes.error);
  // } else {
  //     res.json(getJokes.document);
  // }
  return res.send();
});

jokeRoute.route('/addJoke').post((req, res) => {
  const newJOKE = new JOKE(req.body);
  console.log(req.body);
  newJOKE
    .save()
    .then(() => {
      res.status(200).json({ Joke: 'Joke added successfully.' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('adding new joke failed.');
    });
});

jokeRoute.route('/test').get((req, res) => {
  console.log('test', req.body);
  return res.status(200).send('Want to hear a joke?');
});

export default jokeRoute;
