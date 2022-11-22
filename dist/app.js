"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = require("./config/default");
const express_1 = __importDefault(require("express"));
const connectDb_1 = __importDefault(require("./config/connectDb"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const app = (0, express_1.default)();
app.use("/api", authRouter_1.default);
app.listen(default_1.PORT, () => {
    console.log(`Server is runnng on port ${default_1.PORT}`);
    (0, connectDb_1.default)();
});
