"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('token', authHeader);
    if (!authHeader) {
        console.log('No token');
        return res.status(401).send('Not authorized');
    }
    try {
        req.body.user = jsonwebtoken_1.default.verify(authHeader, 'testPSW');
    }
    catch (err) {
        console.log(err);
        return res.status(401).send('Error authorizing');
    }
    next();
};
exports.checkToken = checkToken;
//# sourceMappingURL=checkToken.js.map