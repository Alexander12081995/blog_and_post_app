import {BlogUpdateInputDto} from '../../dto/blog.input-dto';
import {db} from '../../../db/in-memory.db';
import {HttpStatus} from '../../../core/types/http-statuses';
import {Response, Request} from 'express';

export const updateBlogHandler = (req: Request<{id: string}, {}, BlogUpdateInputDto>, res: Response) => {
    const findIndex = db.blogs.findIndex(b => b.id === req.params.id);
    if(findIndex !== -1) {
        db.blogs[findIndex] = {
            ...db.blogs[findIndex],
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
        }
        res.sendStatus(HttpStatus.NoContent)
    }else {
        res.send(HttpStatus.NotFound)
    }
}