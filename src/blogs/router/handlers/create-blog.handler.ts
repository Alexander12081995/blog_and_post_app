import {Request, Response} from 'express';
import {BlogCreateInputDto} from '../../dto/blog.input-dto';
import {Blog} from '../../types/blog.types';
import {HttpStatus} from '../../../core/types/http-statuses';
import {blogRepository} from '../../repositories/blog-repository';

export const createBlogHandler = (req: Request<{}, {}, BlogCreateInputDto>, res: Response<Blog>) => {
    const blog = blogRepository.create(req.body)

    res.status(HttpStatus.Created).send(blog);
}



