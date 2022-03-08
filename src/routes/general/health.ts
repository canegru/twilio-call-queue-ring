import { Request, Response } from 'express';

const health = (req: Request, res: Response): void => {
    res.json({
        success: true,
    });
};

export default health;
