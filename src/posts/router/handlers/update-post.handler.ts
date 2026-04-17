import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/http-statuses';
import {postRepository} from '../../repositories/post-repository';

export const updatePostHandler = (req: Request<{id: string}>, res: Response) => {
    const post = postRepository.findById(req.params.id);
    if(!post) {
        res.status(HttpStatus.NotFound)
        return
    }
    const isError = postRepository.update(req.params.id, req.body)
    if(isError) {
        res.status(HttpStatus.NotFound).send({errorsMessages: [{field: "blogId", message: "Blog does not exist"}]})
    } else {
        res.sendStatus(HttpStatus.NoContent)
    }
}