import {Request, Response} from 'express';
import {db} from '../../../db/in-memory.db';
import {HttpStatus} from '../../../core/types/http-statuses';

export const deletePostHandler = (req: Request, res: Response) => {
    const findIndex = db.posts.findIndex(p => p.id === req.params.id);
    if(findIndex !== -1) {
        db.posts = db.posts.filter(p => p.id !== req.params.id);
        res.sendStatus(HttpStatus.NoContent)
    } else {
        res.sendStatus(HttpStatus.BadRequest)
    }
}