"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP = exports.MONGODB_URI = exports.PORT = void 0;
require('dotenv').config();
exports.PORT = process.env.PORT;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.SMTP = {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
};
