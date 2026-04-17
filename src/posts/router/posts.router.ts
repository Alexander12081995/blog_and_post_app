import {Router, Request, Response} from 'express';
import {db} from '../../db/in-memory.db';
import {Post} from '../types/post.types';
import {PostCreateInputDto, PostUpdateInputDto} from '../dto/post.input-dto';
import {HttpStatus} from '../../core/types/http-statuses';

export const postsRouter = Router({})

postsRouter
    .get('', (req: Request, res: Response<Post[]>) => {
        res.status(200).send(db.posts)
    })

    .get('/:id', (req: Request<{ id: string }>, res: Response<Post | HttpStatus.NotFound>) => {
        const findPost = db.posts.find(p => p.id === req.params.id);
        if (findPost) {
            res.status(HttpStatus.Ok).send(findPost)
        } else {
            res.send(HttpStatus.NotFound)
        }
    })

    .post('', (req: Request<{}, {}, PostCreateInputDto>, res: Response<Post>) => {
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
    })

    .put('/:id', (req: Request<{id: string}>, res: Response) => {
        const findIndex = db.posts.findIndex(p => p.id === req.params.id);
        if (findIndex !== -1) {
            db.posts[findIndex] = {
                ...db.posts[findIndex],
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                blogId: req.body.blogId
            }
            res.sendStatus(HttpStatus.NoContent)
        } else {
            res.sendStatus(HttpStatus.BadRequest)
        }
    })

    .delete('/:id', (req: Request, res: Response) => {
        const findIndex = db.posts.findIndex(p => p.id === req.params.id);
        if(findIndex !== -1) {
            db.posts = db.posts.filter(p => p.id !== req.params.id);
            res.sendStatus(HttpStatus.NoContent)
        } else {
           res.sendStatus(HttpStatus.BadRequest)
        }
    })