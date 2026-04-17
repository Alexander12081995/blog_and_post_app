import {BlogUpdateInputDto} from '../../dto/blog.input-dto';
import {HttpStatus} from '../../../core/types/http-statuses';
import {Request, Response} from 'express';
import {blogRepository} from '../../repositories/blog-repository';

export const updateBlogHandler = (req: Request<{ id: string }, {}, BlogUpdateInputDto>, res: Response) => {
    const blog = blogRepository.findById(req.params.id);
    if (!blog) {
        res.sendStatus(HttpStatus.NotFound)
        return
    }

    blogRepository.update(req.params.id, req.body)
    res.sendStatus(HttpStatus.NoContent)
}