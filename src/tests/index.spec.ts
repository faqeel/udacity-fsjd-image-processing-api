import supertest from 'supertest';
import path from 'path';

import app from '../index';
import * as imageService from '../service/image.service';

const request = supertest(app);

describe('/api/images endpoint', () => {
    describe('GET /api/images', () => {
        it('should respond with 200 status code when the request is valid', (done: DoneFn) => {
            request
                .get('/api/images')
                .query({ filename: 'encenadaport.jpg' })
                .expect('Content-Type', 'image/jpeg')
                .expect(200)
                .end((err): void => {
                    if (err) {
                        done.fail(err);
                    } else {
                        done();
                    }
                });
        });

        it('should respond with 400 status code when the request is missing file name', (done: DoneFn) => {
            request
                .get('/api/images')
                .expect(400)
                .end((err): void => {
                    if (err) {
                        done.fail(err);
                    } else {
                        done();
                    }
                });
        });

        it('should respond with 404 status code when the file does not exist', (done: DoneFn) => {
            request
                .get('/api/images')
                .query({ filename: 'image.png' })
                .expect(404)
                .end((err): void => {
                    if (err) {
                        done.fail(err);
                    } else {
                        done();
                    }
                });
        });
    });
});

describe('Image Processing', () => {
    it('should return the original image path when invalid width or height is passed', async () => {
        expect(
            await imageService.resizeImage('encenadaport.jpg', -100, 100)
        ).toEqual(
            path.join(
                __dirname,
                path.relative(__dirname, './images'),
                'encenadaport.jpg'
            )
        );
    });

    it('it should return the resized image path when the process success', async () => {
        expect(
            await imageService.resizeImage('encenadaport.jpg', 200, 200)
        ).toEqual(
            path.join(
                __dirname,
                path.relative(__dirname, './images'),
                'thumb',
                'encenadaport-200x200.jpg'
            )
        );
    });
});
