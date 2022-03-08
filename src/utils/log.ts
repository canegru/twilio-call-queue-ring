import bunyan from 'bunyan';

const logger = bunyan.createLogger({ name: 'API' });

export default logger;
