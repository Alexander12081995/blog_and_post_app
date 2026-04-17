import {Request, Response} from 'express';
import {BlogCreateInputDto} from '../../dto/blog.input-dto';
import {Blog} from '../../types/blog.types';
import {db} from '../../../db/in-memory.db';
import {HttpStatus} from '../../../core/types/http-statuses';

export const createBlogHandler = (req: Request<{}, {}, BlogCreateInputDto>, res: Response<Blog>) => {
    const newBlog: Blog = {
        id: (new Date()).toISOString(),
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    }

    db.blogs.push(newBlog);
    res.status(HttpStatus.Created).send(newBlog);
}