"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireUser = (req, res, next) => {
    const user = res.locals.user;
    if (!user) {
        res.status(401).send({ error: 'Unauthorized' });
    }
    else {
        next();
    }
};
exports.default = requireUser;
