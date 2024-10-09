import { Request, Response, NextFunction } from 'express';

const verifyInputs = (req: Request, res: Response, next: NextFunction) => {
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

export { verifyInputs };