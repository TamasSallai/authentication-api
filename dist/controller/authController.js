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
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessTokenHandler = exports.createSessionHandler = void 0;
const authService_1 = require("../service/authService");
const userService_1 = require("../service/userService");
const jwt_1 = require("../utils/jwt");
const createSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = { message: 'Invalid email or password' };
    const { email, password } = req.body;
    const user = yield (0, userService_1.findUserByEmail)(email);
    if (!user) {
        return res.status(400).send(message);
    }
    if (!user.verified) {
        return res.status(400).send({ error: 'Email is not verified' });
    }
    const isValid = user.validatePassword(password);
    if (!isValid) {
        return res.status(400).send(message);
    }
    const accessToken = (0, authService_1.signAccessToken)(user);
    const refreshToken = yield (0, authService_1.signRefreshToken)(user._id);
    return res.send({ accessToken, refreshToken });
});
exports.createSessionHandler = createSessionHandler;
const refreshAccessTokenHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.get('x-refresh') || '';
    console.log(refreshToken);
    const decoded = (0, jwt_1.verifyJwt)(refreshToken, 'refreshTokenKey');
    if (!decoded) {
        console.log('token is not valid');
        return res.status(401).send({ error: 'Could not refresh token' });
    }
    const session = yield (0, authService_1.findSessionById)(decoded.session);
    if (!session || !session.valid) {
        return res.status(401).send({ error: 'Could not refresh token' });
    }
    const user = yield (0, userService_1.findUserById)(String(session.user));
    if (!user) {
        return res.status(401).send({ error: 'Could not refresh token' });
    }
    const accessToken = (0, authService_1.signAccessToken)(user);
    return res.send({ accessToken });
});
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
