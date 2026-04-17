import {Request, Response} from "express"
import {HttpStatus} from '../../../core/types/http-statuses';
import {blogRepository} from '../../repositories/blog-repository';

export const getListBlogsHandler = (req: Request, res: Response) => {
    const blogs = blogRepository.findAll()

    res.status(HttpStatus.Ok).send(blogs)
}