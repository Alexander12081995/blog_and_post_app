import {Router, Request, Response} from 'express';
import {Blog} from '../types/blog.types';
import {HttpStatus} from '../../core/types/http-statuses';
import {db} from '../../db/in-memory.db';
import {BlogCreateInputDto, BlogUpdateInputDto} from '../dto/blog.input-dto';

export const blogsRouter = Router({})

blogsRouter
    .get("", (req: Request, res: Response<Blog[]>) => {
        res.status(HttpStatus.Ok).send(db.blogs)
    })


    .get('/:id', (req: Request<{id: string}>, res: Response) => {
        const findBlog = db.blogs.find(b => b.id === req.params.id);
        if(findBlog) {
            res.status(HttpStatus.Ok).send(findBlog)
        } else {
            res.send(HttpStatus.NotFound)
        }
    })

    .post('', (req: Request<{}, {}, BlogCreateInputDto>, res: Response<Blog>) => {
        const newBlog: Blog = {
            id: (new Date()).toISOString(),
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
        }

        db.blogs.push(newBlog);
        res.status(HttpStatus.Created).send(newBlog);
    })

    .put('/:id', (req: Request<{id: string}, {}, BlogUpdateInputDto>, res: Response) => {
        const findIndex = db.blogs.findIndex(b => b.id === req.params.id);
        if(findIndex !== -1) {
            db.blogs[findIndex] = {
                ...db.blogs[findIndex],
                name: req.body.name,
                description: req.body.description,
                websiteUrl: req.body.websiteUrl,
            }
            res.sendStatus(HttpStatus.NoContent)
        }else {
            res.send(HttpStatus.NotFound)
        }
    })

    .delete('/:id', (req: Request<{id: string}>, res: Response) => {
        const findBlog = db.blogs.find(b => b.id === req.params.id);
        if(findBlog) {
            db.blogs = db.blogs.filter(b => b.id !== req.params.id);
            res.sendStatus(HttpStatus.NoContent)
        } else {
            res.sendStatus(HttpStatus.NotFound);
        }
    })


