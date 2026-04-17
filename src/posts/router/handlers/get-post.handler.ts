import {Request, Response} from 'express';
import {Post} from '../../types/post.types';
import {HttpStatus} from '../../../core/types/http-statuses';
import {postRepository} from '../../repositories/post-repository';

export const getPostHandler = (req: Request<{ id: string }>, res: Response<Post | HttpStatus.BadRequest>) => {
    const post = postRepository.findById(req.params.id);
    if (post) {
        res.status(HttpStatus.Ok).send(post);
    } else {
        res.sendStatus(HttpStatus.NotFound);
    }
}