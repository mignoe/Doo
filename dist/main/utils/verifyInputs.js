"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyInputs = void 0;
const verifyInputs = (req, res, next) => {
    // const keys = Object.keys(req.query);
    // if (keys.length === 0) {
    //     return res.status(400).json({ error: 'No input provided' });
    // }
    // const missingFields = keys.filter(key => req.body[key] === undefined);
    // if (missingFields.length) {
    //     return res.status(400).json({ error: `Missing values for fields: ${missingFields.join(', ')}` });
    // }
    // next(); // Proceed if all fields are present
    next();
};
exports.verifyInputs = verifyInputs;
