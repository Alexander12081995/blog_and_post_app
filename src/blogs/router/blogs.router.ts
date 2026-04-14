import {Router, Request, Response} from 'express';

export const blogsRouter = Router({})

blogsRouter
    .get("", (req: Request, res: Response) => {
        res.send('is working')
    })


    .get('/:id', (req: Request, res: Response) => {
    })
    .post('', (req: Request, res: Response) => {
    })
    .put('', (req: Request, res: Response) => {
    })
    .delete('', (req: Request, res: Response) => {
    })


