import {BlogUpdateInputDto} from '../../dto/blog.input-dto';
import {HttpStatus} from '../../../core/types/http-statuses';
import {Request, Response} from 'express';
import {blogsRepository} from '../../repositories/blogsRepository';

export const updateBlogHandler = (req: Request<{ id: string }, {}, BlogUpdateInputDto>, res: Response) => {
    const blog = blogsRepository.findById(req.params.id);
    if (!blog) {
        res.sendStatus(HttpStatus.NotFound)
        return
    }

    blogsRepository.update(req.params.id, req.body)
    res.sendStatus(HttpStatus.NoContent)
}