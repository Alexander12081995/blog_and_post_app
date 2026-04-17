import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/http-statuses';
import {blogsRepository} from '../../repositories/blogsRepository';

export const getBlogHandler = (req: Request<{id: string}>, res: Response) => {
    const findBlog = blogsRepository.findById(req.params.id);

    if(findBlog) {
        res.status(HttpStatus.Ok).send(findBlog)
    } else {
        res.send(HttpStatus.NotFound)
    }
}