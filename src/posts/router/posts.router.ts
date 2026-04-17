import {Router} from 'express';
import {getListPostsHandler} from './handlers/get-list-posts.handler';
import {getPostHandler} from './handlers/get-post.handler';
import {createPostHandler} from './handlers/create-post.handler';
import {updatePostHandler} from './handlers/update-post.handler';
import {deletePostHandler} from './handlers/delete-post.handler';
import {idValidation} from '../../core/middlewares/validation/params-id.validation-middleware';
import {inputValidationResultMiddleware} from '../../core/middlewares/validation/input-validation-result.middleware';
import {postInputDtoValidation} from '../validation/post.input-dto-validation-middleware';

export const postsRouter = Router({})

postsRouter
    .get('', getListPostsHandler)
    .get('/:id', idValidation, inputValidationResultMiddleware, getPostHandler)
    .post('', postInputDtoValidation, inputValidationResultMiddleware, createPostHandler)
    .put('/:id',idValidation, postInputDtoValidation,inputValidationResultMiddleware, updatePostHandler)
    .delete('/:id', idValidation, deletePostHandler)

