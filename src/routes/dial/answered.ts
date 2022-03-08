import { Request, Response } from 'express';

import { twiml } from '../../utils/twilio';

const answered = async (req: Request, res: Response) => {
    const { AnsweredBy } = req.body;

    const response = new twiml.VoiceResponse();

    if (AnsweredBy === 'human') {
        response.say(
            {
                voice: 'Polly.Salli',
                language: 'en-US',
            },
            'This phone call will queue and go to flex',
        );

        response
            .enqueue({
                workflowSid: process.env.WORKFLOW_SID,
                waitUrl: 'http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical&amp;Message=please%20wait',
            })
            .task(
                JSON.stringify({
                    firstName: 'Bob',
                    lastName: 'Smith',
                }),
            );
    } else {
        response.say(
            {
                voice: 'Polly.Salli',
                language: 'en-US',
            },
            'This is a voicemail left by the automation test.',
        );
    }

    res.send(response.toString());
};

export default answered;
