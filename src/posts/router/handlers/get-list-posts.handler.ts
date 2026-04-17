import {Request, Response} from 'express'
import {Post} from '../../types/post.types';
import {postRepository} from '../../repositories/post-repository';

export const getListPostsHandler = (req: Request, res: Response<Post[]>) => {
    const posts = postRepository.findAll()
    res.status(200).send(posts)
}