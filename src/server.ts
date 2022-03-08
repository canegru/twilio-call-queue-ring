/* eslint-disable no-restricted-syntax */
import cors from 'cors';
import express, { Errback, Express, NextFunction, Request, RequestHandler, Response } from 'express';

import routes from './routes';

import { ServerConfiguration } from './server.types';

/**
 * Wrapper that handles the call of every route and passes next if error occurs
 * This elimates the need for try catch in every single route
 * @param routeHandler callback function
 */
// eslint-disable-next-line max-len
const apiWrapper = (handler: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(handler(req, res, next)).catch((err: Errback) => next(err));

const server = async ({ config }: { config: ServerConfiguration }) => {
    try {
        const { port } = config;

        const app: Express = express();
        app.use(cors());

        app.use(express.json());
        app.use(
            express.urlencoded({
                extended: true,
            }),
        );

        for await (const { method, path, route } of routes) {
            if (method === 'get') app.get(path, route);
            else if (method === 'post') app.post(path, route);
            else if (method === 'put') app.put(path, route);
            else throw new Error('Method not supported, please add method in server.ts');
        }
        // app.get('/health', apiWrapper(routes.health));
        // app.post('/call', apiWrapper(routes.call));
        // app.post('/answered', apiWrapper(routes.answered));

        await app.listen(config.port);
        return { port };
    } catch (e) {
        return false;
    }
};

export default server;
