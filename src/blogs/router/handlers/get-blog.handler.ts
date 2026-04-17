import {Request, Response} from 'express';
import {db} from '../../../db/in-memory.db';
import {HttpStatus} from '../../../core/types/http-statuses';

export const getBlogHandler = (req: Request<{id: string}>, res: Response) => {
    const findBlog = db.blogs.find(b => b.id === req.params.id);
    if(findBlog) {
        res.status(HttpStatus.Ok).send(findBlog)
    } else {
        res.send(HttpStatus.NotFound)
    }
}