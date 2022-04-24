import { NextFunction, Request, Response } from 'express';
import mcache from 'memory-cache';
import { StatusCodes } from 'http-status-codes';

// Add sendFileWrapper() to Express' Response object
// to be able to override sendFile method
declare module 'express-serve-static-core' {
    interface Response {
        sendFileWrapper(path: string, fn?: Errback): void;
    }
}

const cache = (req: Request, response: Response, next: NextFunction): void => {
    const key: string = '__express__' + (req.originalUrl || req.url);
    const value: string = mcache.get(key);

    console.log('Checking if the request is already cached...');

    if (value) {
        console.log('The request is already cached');
        response.status(StatusCodes.OK).sendFile(value);
        return;
    }

    console.log('The request is not cached');

    // Wrap Express' res.sendFile() to cache the response
    // before sending it
    response.sendFileWrapper = response.sendFile;
    response.sendFile = (path: string): void => {
        mcache.put(key, path);
        response.sendFileWrapper(path);
    };

    next();
};

export { cache };
