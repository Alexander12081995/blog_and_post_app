import {Request, Response} from 'express'
import {Post} from '../../types/post.types';
import {db} from '../../../db/in-memory.db';

export const getListPostsHandler = (req: Request, res: Response<Post[]>) => {
    res.status(200).send(db.posts)
}