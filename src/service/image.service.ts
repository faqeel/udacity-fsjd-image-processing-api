import path from 'path';
import sharp from 'sharp';

import { INPUT_DIR, OUTPUT_DIR } from '../config';
import * as FileUtils from '../utils/fileUtils';

const resizeImage = async (
    filename: string,
    width: number,
    height: number
): Promise<string | number> => {
    console.log(`Resizing ${filename} image to be ${width}x${height}...`);

    const source: string = path.join(INPUT_DIR, filename);
    const thumb: string = path.join(
        OUTPUT_DIR,
        _generateThumbName(filename, width, height)
    );

    if (!INPUT_DIR || !OUTPUT_DIR) {
        console.warn('Input or output directories have not been initialized');
        return -1;
    }

    if (!filename) {
        console.warn('The file name is invalid');
        return -2;
    }

    if (!FileUtils.isFileExists(source)) {
        console.warn(`${filename} not found in the '${INPUT_DIR}'`);
        return -3;
    }

    if (!width || width < 0 || !height || height < 0) {
        console.warn('The dimensions are invalid');
        return source;
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
