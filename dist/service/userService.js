"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.findUserById = exports.createUser = void 0;
const User_1 = __importDefault(require("../model/User"));
const createUser = (input) => {
    return User_1.default.create(input);
};
exports.createUser = createUser;
const findUserById = (id) => {
    return User_1.default.findById(id);
};
exports.findUserById = findUserById;
const findUserByEmail = (email) => {
    return User_1.default.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
