import {Router} from 'express';
import {getListPostsHandler} from './handlers/get-list-posts.handler';
import {getPostHandler} from './handlers/get-post.handler';
import {createPostHandler} from './handlers/create-post.handler';
import {updatePostHandler} from './handlers/update-post.handler';
import {deletePostHandler} from './handlers/delete-post.handler';

export const postsRouter = Router({})

postsRouter
    .get('', getListPostsHandler)
    .get('/:id', getPostHandler)
    .post('', createPostHandler)
    .put('/:id', updatePostHandler)
    .delete('/:id', deletePostHandler)

