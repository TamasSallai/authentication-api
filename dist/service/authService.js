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
exports.signRefreshToken = exports.signAccessToken = void 0;
const Session_1 = __importDefault(require("../model/Session"));
const jwt_1 = require("../utils/jwt");
const signAccessToken = (user) => {
    const payload = user.toJSON();
    const accessToken = (0, jwt_1.signJwt)(payload, 'accessTokenPrivateKey');
    return accessToken;
};
exports.signAccessToken = signAccessToken;
const createSession = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return Session_1.default.create({ user: userId });
});
const signRefreshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield createSession(userId);
    const refreshToken = (0, jwt_1.signJwt)({
        session: session._id,
    }, 'refreshTokenPrivateKey');
    return refreshToken;
});
exports.signRefreshToken = signRefreshToken;
