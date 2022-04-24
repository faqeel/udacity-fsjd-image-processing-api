import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as imageService from '../service/image.service';

const resizeImage = async (
    request: Request,
    response: Response
): Promise<void> => {
    const filename: string = (request.query.filename as string) || '';
    const width: number = parseInt(request.query.width as string, 10) || -1;
    const height: number = parseInt(request.query.height as string, 10) || -1;

    // if the returned value is string, it means that the resizing
    // process succeeded and the value represents the path to the
    // resized image. Otherwise, a number will be returned indicates
    // an error code.
    const image: string | number = await imageService.resizeImage(
        filename,
        width,
        height
    );

    if (image === -1) {
        response.status(StatusCodes.BAD_REQUEST).send('Invalid file name');
        return;
    }

    if (image === -2) {
        response.status(StatusCodes.NOT_FOUND).send('Sorry! No image found');
        return;
    }

    response.status(StatusCodes.OK).sendFile(image as string);
};

export { resizeImage };
