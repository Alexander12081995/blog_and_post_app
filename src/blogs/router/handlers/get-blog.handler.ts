import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/http-statuses';
import {blogRepository} from '../../repositories/blog-repository';

export const getBlogHandler = (req: Request<{id: string}>, res: Response) => {
    const findBlog = blogRepository.findById(req.params.id);

    if(findBlog) {
        res.status(HttpStatus.Ok).send(findBlog)
    } else {
        res.send(HttpStatus.NotFound)
    }
}