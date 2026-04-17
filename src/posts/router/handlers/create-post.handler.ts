import {Request, Response} from 'express';
import {PostCreateInputDto} from '../../dto/post.input-dto';
import {Post} from '../../types/post.types';
import {HttpStatus} from '../../../core/types/http-statuses';
import {postRepository} from '../../repositories/post-repository';
import {ErrorsMessages} from '../../../core/types/errors';

export const createPostHandler = (req: Request<{}, {}, PostCreateInputDto>, res: Response<Post | ErrorsMessages>) => {
    const post = postRepository.create(req.body);

    if (post) {
        res.status(HttpStatus.Created).send(post)
    } else {
        res.status(HttpStatus.NotFound).send({errorsMessages: [{field: "blogId", message: "Blog does not exist"}]})
    }


}