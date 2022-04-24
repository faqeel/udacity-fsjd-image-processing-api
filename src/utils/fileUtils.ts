import fs from 'fs';

const isFileExists = (path: string): boolean => {
    return fs.existsSync(path);
};

export { isFileExists };
