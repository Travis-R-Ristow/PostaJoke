"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joke_1 = __importDefault(require("../Models/joke"));
const express_1 = __importDefault(require("express"));
const jokeRoute = express_1.default.Router();
jokeRoute.route('/getJoke').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getJokes = yield joke_1.default.find();
    console.log(getJokes);
    // if (getJokes.error) {
    //     console.log(getJokes.error);
    // } else {
    //     res.json(getJokes.document);
    // }
    return res.send();
}));
jokeRoute.route('/addJoke').post((req, res) => {
    const newJOKE = new joke_1.default(req.body);
    console.log(req.body);
    newJOKE.save()
        .then(() => {
        res.status(200).json({ 'Joke': 'Joke added successfully.' });
    })
        .catch(err => {
        console.log(err);
        res.status(500).send('adding new joke failed.');
    });
});
jokeRoute.route('/test').get((req, res) => {
    return res.status(200).send('Want to hear a joke?');
});
exports.default = jokeRoute;
//# sourceMappingURL=Jokes.js.map