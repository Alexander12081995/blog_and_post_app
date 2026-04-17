import {Request, Response} from 'express';
import {db} from '../../../db/in-memory.db';
import {HttpStatus} from '../../../core/types/http-statuses';

export const deleteBlogHandler = (req: Request<{ id: string }>, res: Response) => {
    const findBlog = db.blogs.find(b => b.id === req.params.id);
    if (findBlog) {
        db.blogs = db.blogs.filter(b => b.id !== req.params.id);
        res.sendStatus(HttpStatus.NoContent)
    } else {
        res.sendStatus(HttpStatus.NotFound);
    }
}