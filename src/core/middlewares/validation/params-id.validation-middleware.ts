import {param} from 'express-validator';

export const idValidation = param("id")
    .exists()
    .withMessage('ID is required')
    .trim()
    .isString()
    .withMessage('ID must be a string')