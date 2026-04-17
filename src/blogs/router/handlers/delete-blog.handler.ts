import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/http-statuses';
import {blogsRepository} from '../../repositories/blogsRepository';

export const deleteBlogHandler = (req: Request<{ id: string }>, res: Response) => {
    const blog = blogsRepository.findById(req.params.id);

    if (!blog) {
        res.sendStatus(HttpStatus.NotFound);
        return;
    }

    blogsRepository.delete(req.params.id)
    res.sendStatus(HttpStatus.NoContent)
}