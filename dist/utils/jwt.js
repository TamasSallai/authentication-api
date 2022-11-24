"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signJwt = (object, keyName) => {
    const keyBase64 = keyName === 'accessTokenPrivateKey'
        ? process.env.ACCESS_TOKEN_KEY
        : process.env.REFRESH_TOKEN_KEY;
    const signingKey = Buffer.from(keyBase64, 'base64').toString('ascii');
    console.log(`base64 decoded signingkey: ${signingKey}`);
    return jsonwebtoken_1.default.sign(object, signingKey);
};
exports.signJwt = signJwt;
const verifyJwt = (token, keyName) => {
    const keyBase64 = keyName === 'accessTokenPublicKey'
        ? process.env.ACCESS_TOKEN_KEY
        : process.env.REFRESH_TOKEN_KEY;
    const publicKey = Buffer.from(keyBase64, 'base64').toString('ascii');
    console.log(`base64 decoded public key: ${publicKey}`);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return decoded;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};
exports.verifyJwt = verifyJwt;
