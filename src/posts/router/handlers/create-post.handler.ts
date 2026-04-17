import {Request, Response} from 'express';
import {PostCreateInputDto} from '../../dto/post.input-dto';
import {Post} from '../../types/post.types';
import {db} from '../../../db/in-memory.db';
import {HttpStatus} from '../../../core/types/http-statuses';

export const createPostHandler = (req: Request<{}, {}, PostCreateInputDto>, res: Response<Post>) => {
    const newPost: Post = {
        id: (new Date()).toISOString(),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: "haha"
    }

    db.posts.push(newPost)
    res.status(HttpStatus.Created).send(newPost)
}