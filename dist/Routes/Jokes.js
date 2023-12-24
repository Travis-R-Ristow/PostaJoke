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
const checkToken_1 = require("../helpers/checkToken");
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
jokeRoute.route('/addJoke').post(checkToken_1.checkToken, (req, res) => {
    console.log(req.body);
    const newJOKE = new joke_1.default({
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
jokeRoute.route('/getUsersJokes').get(checkToken_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    let result;
    try {
        result = yield joke_1.default.find({ author: req.body.user.id }).then((joke) => joke);
        console.log(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Error finding User's joke.");
    }
    return res.send(result);
}));
exports.default = jokeRoute;
//# sourceMappingURL=Jokes.js.map