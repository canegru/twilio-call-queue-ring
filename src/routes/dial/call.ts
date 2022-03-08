import { Request, Response } from 'express';

import { client } from '../../utils/twilio';

const call = async (req: Request, res: Response) => {
    const results = await client.calls.create({
        machineDetection: 'DetectMessageEnd',
        url: `${process.env.APP_DOMAIN}/answered`,
        method: 'POST',
        from: '+phoneNumber',
        to: '+phoneNumber',
    });

    res.json({
        success: true,
        results,
    });
};

export default call;
