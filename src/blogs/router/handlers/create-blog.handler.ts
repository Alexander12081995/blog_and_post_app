import {Request, Response} from 'express';
import {BlogCreateInputDto} from '../../dto/blog.input-dto';
import {Blog} from '../../types/blog.types';
import {HttpStatus} from '../../../core/types/http-statuses';
import {blogsRepository} from '../../repositories/blogsRepository';

export const createBlogHandler = (req: Request<{}, {}, BlogCreateInputDto>, res: Response<Blog>) => {
    const blog = blogsRepository.create(req.body)

    res.status(HttpStatus.Created).send(blog);
}



