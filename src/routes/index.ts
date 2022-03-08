// User
import { Application, Request, Response } from 'express';

import answered from './dial/answered';
import call from './dial/call';
import health from './general/health';

interface ParserRoute {
    method: 'get' | 'post' | 'put';
    path: string;
    route: (req: Request, res: Response) => void;
}

const parser: ParserRoute[] = [
    { method: 'get', path: '/health', route: health },
    { method: 'post', path: '/call', route: call },
    { method: 'post', path: '/answered', route: answered },
];

export default parser;
