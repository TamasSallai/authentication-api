"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const connectDb_1 = __importDefault(require("./config/connectDb"));
const deserializeUser_1 = require("./middleware/deserializeUser");
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(deserializeUser_1.deserializeUser);
app.use('/api', authRouter_1.default);
app.use('/api', userRouter_1.default);
const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log(`Server is runnng on port ${PORT}`);
    (0, connectDb_1.default)();
});
