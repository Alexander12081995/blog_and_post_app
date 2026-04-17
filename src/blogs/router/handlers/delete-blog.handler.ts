import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/http-statuses';
import {blogRepository} from '../../repositories/blog-repository';

export const deleteBlogHandler = (req: Request<{ id: string }>, res: Response) => {
    const blog = blogRepository.findById(req.params.id);

    if (!blog) {
        res.sendStatus(HttpStatus.NotFound);
        return;
    }

    blogRepository.delete(req.params.id)
    res.sendStatus(HttpStatus.NoContent)
}