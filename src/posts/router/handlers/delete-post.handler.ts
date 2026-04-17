import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/http-statuses';
import {postRepository} from '../../repositories/post-repository';

export const deletePostHandler = (req: Request<{ id: string }>, res: Response) => {
    const post = postRepository.findById(req.params.id)

    if (!post) {
        res.sendStatus(HttpStatus.NotFound)
        return
    }

    postRepository.delete(req.params.id)
    res.sendStatus(HttpStatus.NoContent)
}