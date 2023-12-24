"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const Jokes_1 = __importDefault(require("./Routes/Jokes"));
const mongoose_1 = __importDefault(require("mongoose"));
const Users_1 = __importDefault(require("./Routes/Users"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
mongoose_1.default
    .connect('mongodb+srv://chiefbuddy15:NkT7QNS8QdVkvfem@jokecluster0.vbmlyog.mongodb.net/')
    .then(() => {
    console.log('Database connected.');
});
mongoose_1.default.connection.on('error', (err) => {
    console.log(err);
});
app.use('/jokes', Jokes_1.default);
Jokes_1.default.all('*', (0, cors_1.default)());
app.use('/user', Users_1.default);
Users_1.default.all('*', (0, cors_1.default)());
// app.use(express.static('./client/build'));
// app.get('*', (req, res) =>
//   res.sendFile('build/index.html', { root: './client' })
// );
app.listen(PORT, () => {
    console.log('Server is running on Port:\t' + PORT);
});
//# sourceMappingURL=server.js.map