import twilio from 'twilio';

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const { twiml } = twilio;

export default twilio;
export { client, twiml };
