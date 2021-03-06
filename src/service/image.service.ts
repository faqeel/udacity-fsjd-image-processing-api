import path from 'path';
import sharp from 'sharp';

import * as FileUtils from '../utils/fileUtils';

const resizeImage = async (
    filename: string,
    width: number,
    height: number
): Promise<string | number> => {
    console.log(`Resizing ${filename} image to be ${width}x${height}...`);

    const source: string = path.join(
        __dirname,
        path.relative(__dirname, './images'),
        filename
    );
    const thumb: string = path.join(
        __dirname,
        path.relative(__dirname, './images'),
        'thumb',
        _generateThumbName(filename, width, height)
    );

    if (!filename) {
        console.warn('The file name is invalid');
        return -1;
    }

    if (!FileUtils.isFileExists(source)) {
        console.warn(`${filename} not found'`);
        return -2;
    }

    if (!width || width < 0 || !height || height < 0) {
        console.warn('The dimensions are invalid');
        return -3;
    }

    await sharp(source).resize(width, height).toFile(thumb);

    console.log(`${filename} image has been resized successfully`);
    return thumb;
};

const _generateThumbName = (
    filename: string,
    width: number,
    height: number
): string => {
    const arr: string[] = filename.split('.');
    const index: number = arr.length - 1;
    arr.splice(index, 0, `-${width}x${height}.`);
    return arr.join('');
};

export { resizeImage };
