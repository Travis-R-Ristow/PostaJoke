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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../Models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const userRoute = express_1.default.Router();
userRoute.route('/create-user').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('create-user', req.body);
    bcrypt_1.default.hash(req.body.psw, 7.2, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Failed to create user');
        }
        if (hash) {
            const newUser = new user_1.default({
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
                const accessToken = jsonwebtoken_1.default.sign(tokenObj, 'testPSW');
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
}));
userRoute.route('/login').post((req, res) => {
    console.log('login', req.body);
    user_1.default.findOne({ email: (0, mongoose_1.sanitizeFilter)(req.body.email) })
        .then((user) => {
        var _a;
        if (!user) {
            console.log('Error:: Failed to find user');
            return res.status(500).send('Failed to login');
        }
        bcrypt_1.default
            .compare(req.body.psw, (_a = user.psw) !== null && _a !== void 0 ? _a : '')
            .then((isMatch) => {
            if (isMatch) {
                const tokenObj = {
                    displayName: user.displayName,
                    eml: user.email,
                    id: user._id
                };
                const accessToken = jsonwebtoken_1.default.sign(tokenObj, 'testPSW');
                return res.send({
                    displayName: user.displayName,
                    email: user.email,
                    token: accessToken
                });
            }
            else {
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
exports.default = userRoute;
//# sourceMappingURL=Users.js.map