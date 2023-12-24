import JOKE from '../Models/joke';
import express from 'express';
import { Joke } from '../Models/joke';
import { checkToken } from '../helpers/checkToken';

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

jokeRoute.route('/addJoke').post(checkToken, (req, res) => {
  console.log(req.body);
  const newJOKE = new JOKE({
    author: req.body.user.id,
    joke: req.body.joke,
    punchline: req.body.punchline,
    tags: req.body.tags
  });

  newJOKE
    .save()
    .then(() => {
      res.status(200).send('Joke added successfully.');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('adding new joke failed.');
    });
});

jokeRoute.route('/getUsersJokes').get(checkToken, async (req, res) => {
  console.log(req.body);

  let result;

  try {
    result = await JOKE.find({ author: req.body.user.id }).then((joke) => joke);
    console.log(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error finding User's joke.");
  }
  return res.send(result);
});

export default jokeRoute;
