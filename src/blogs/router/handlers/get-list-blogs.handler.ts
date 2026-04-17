import {Request, Response} from "express"
import {HttpStatus} from '../../../core/types/http-statuses';
import {blogsRepository} from '../../repositories/blogsRepository';

export const getListBlogsHandler = (req: Request, res: Response) => {
    const blogs = blogsRepository.findAll()

    res.status(HttpStatus.Ok).send(blogs)
}