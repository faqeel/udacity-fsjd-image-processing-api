import { Router } from 'express';

import * as imageController from '../controller/image.controller';
import { cache } from '../common/cache';

const router: Router = Router();

router.get('/', cache, imageController.resizeImage);

export default router;
