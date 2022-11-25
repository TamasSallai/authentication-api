"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireUser_1 = __importDefault(require("../controller/requireUser"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.post('/users', userController_1.createUserHandler);
router.post('/users/verify/:id/:verificationCode', userController_1.verifyUserHandler);
router.post('/users/forgotpassword', userController_1.forgotPasswordHandler);
router.post('/users/resetpassword/:id/:passwordResetCode', userController_1.resetPasswordHandler);
router.get('/users/me', requireUser_1.default, userController_1.getCurrentUserhandler);
exports.default = router;
