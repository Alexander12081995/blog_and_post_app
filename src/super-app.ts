import express, {Express, Request, Response} from "express";

export const RouterPaths = {
    blogs: "blogs",
    posts: "posts",
}

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.status(200).json('hello incubator')
    })

    return app
}