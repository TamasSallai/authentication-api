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
exports.getCurrentUserhandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.verifyUserHandler = exports.createUserHandler = void 0;
const uuid_1 = require("uuid");
const userService_1 = require("../service/userService");
const mailer_1 = __importDefault(require("../utils/mailer"));
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield (0, userService_1.createUser)(body);
        yield (0, mailer_1.default)({
            from: 'test@example.com',
            to: user.email,
            subject: 'Please verify your account',
            text: `verification code ${user.verificationCode}. Id: ${user._id}`,
        });
        return res.send({ success: 'User created successfully.' });
    }
    catch (error) {
        return res.status(400).send({ error: 'Email has already been registered' });
    }
});
exports.createUserHandler = createUserHandler;
const verifyUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, verificationCode } = req.params;
        const user = yield (0, userService_1.findUserById)(id);
        if (!user) {
            return res.status(404).send({ error: 'Could not find user' });
        }
        if (user.verified) {
            return res.status(400).send({ error: 'User is already verified' });
        }
        if (user.verificationCode === verificationCode) {
            user.verified = true;
            yield user.save();
            return res.send({ success: 'User is verified' });
        }
        return res.status(400).send({ error: 'Could not verify user' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({ error: error.message });
        }
    }
});
exports.verifyUserHandler = verifyUserHandler;
const forgotPasswordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = {
        message: 'If there is a registered user with that email, you will receive a password reset email',
    };
    const { email } = req.body;
    const user = yield (0, userService_1.findUserByEmail)(email);
    if (!user) {
        console.log(`User with email ${email} does not exsists`);
        return res.send(message);
    }
    if (!user.verified) {
        return res.status(400).send({ error: 'User is not verified' });
    }
    user.passwordResetCode = (0, uuid_1.v4)();
    yield user.save();
    yield (0, mailer_1.default)({
        from: 'test@example.com',
        to: user.email,
        subject: 'Reset your password',
        text: `Password reset code ${user.passwordResetCode}. Id: ${user._id}`,
    });
    return res.send(message);
});
exports.forgotPasswordHandler = forgotPasswordHandler;
const resetPasswordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, passwordResetCode } = req.params;
        const { password, passwordConfirmation } = req.body;
        const user = yield (0, userService_1.findUserById)(id);
        if (!user ||
            !user.passwordResetCode ||
            user.passwordResetCode !== passwordResetCode) {
            return res.status(400).send({ error: 'Could not reset user password' });
        }
        if (password !== passwordConfirmation) {
            return res.status(400).send({ error: 'Passwords do not match' });
        }
        user.passwordResetCode = null;
        user.password = password;
        yield user.save();
        return res.send({ success: 'Successfully updated password' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({ error: 'Invalid input' });
        }
    }
});
exports.resetPasswordHandler = resetPasswordHandler;
const getCurrentUserhandler = (req, res) => {
    return res.send(res.locals.user);
};
exports.getCurrentUserhandler = getCurrentUserhandler;
