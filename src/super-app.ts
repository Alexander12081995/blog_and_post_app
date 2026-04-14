import express, {Express} from "express";
import {blogsRouter} from './blogs/router/blogs.router';
import {postsRouter} from './posts/router/posts.router';
import {testingRouter} from './testing/router/testing.router';
import {BLOGS_PATH, POSTS_PATH, TESTING_PATH} from './core/paths/paths';

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.use(BLOGS_PATH, blogsRouter)
    app.use(POSTS_PATH, postsRouter)
    app.use(TESTING_PATH, testingRouter)

    return app
}