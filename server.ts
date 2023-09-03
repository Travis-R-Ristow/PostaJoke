import cors from 'cors';
import express from 'express';
import { json } from 'body-parser';
import jokeRoute from './Routes/Jokes'
import mongoose from 'mongoose';
import userRoute from './Routes/Users';

const app = express();

const PORT = process.env.PORT || 7200;

app.use(cors());
app.use(json());

mongoose.connect('mongodb+srv://chiefbuddy15:NkT7QNS8QdVkvfem@jokecluster0.vbmlyog.mongodb.net/')
  .then(() => {
    console.log("Database connected.");
  });
mongoose.connection.on('error', (err) => { console.log(err) } );

app.use('/jokes', jokeRoute);
  jokeRoute.all('*', cors());
app.use('/user', userRoute);
  userRoute.all('*', cors());

// app.use(express.static('./client/build'));
// app.get('*', (req, res) =>
//   res.sendFile('build/index.html', { root: './client' })
// );

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});