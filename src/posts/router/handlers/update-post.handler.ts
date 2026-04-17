import {Request, Response} from 'express';
import {db} from '../../../db/in-memory.db';
import {HttpStatus} from '../../../core/types/http-statuses';

export const updatePostHandler = (req: Request<{id: string}>, res: Response) => {
    const findIndex = db.posts.findIndex(p => p.id === req.params.id);
    if (findIndex !== -1) {
        db.posts[findIndex] = {
            ...db.posts[findIndex],
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId
        }
        res.sendStatus(HttpStatus.NoContent)
    } else {
        res.sendStatus(HttpStatus.BadRequest)
    }
}