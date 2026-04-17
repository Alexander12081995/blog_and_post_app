import {Request, Response} from 'express';
import {Post} from '../../types/post.types';
import {HttpStatus} from '../../../core/types/http-statuses';
import {db} from '../../../db/in-memory.db';

export const getPostHandler = (req: Request<{ id: string }>, res: Response<Post | HttpStatus.BadRequest>) => {
    const findPost = db.posts.find(post => post.id === req.params.id);
    if (findPost) {
        res.status(HttpStatus.Ok).send(findPost);
    } else {
        res.sendStatus(HttpStatus.NotFound);
    }
}