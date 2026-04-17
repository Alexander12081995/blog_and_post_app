import {Router} from 'express';
import {getListBlogsHandler} from './handlers/get-list-blogs.handler';
import {getBlogHandler} from './handlers/get-blog.handler';
import {createBlogHandler} from './handlers/create-blog.handler';
import {updateBlogHandler} from './handlers/update-blog.handler';
import {deleteBlogHandler} from './handlers/delete-blog.handler';

export const blogsRouter = Router({})

blogsRouter
    .get("", getListBlogsHandler)
    .get('/:id', getBlogHandler)
    .post('', createBlogHandler)
    .put('/:id', updateBlogHandler)
    .delete('/:id', deleteBlogHandler)


