import express from 'express';
import {setupApp} from '../../../src/super-app';
import request from 'supertest';
import {BLOGS_PATH, POSTS_PATH, TESTING_PATH} from '../../../src/core/paths/paths';
import {HttpStatus} from '../../../src/core/types/http-statuses';
import {Post} from '../../../src/posts/types/post.types';
import {PostCreateInputDto, PostUpdateInputDto} from '../../../src/posts/dto/post.input-dto';
import {Blog} from '../../../src/blogs/types/blog.types';
import {BlogCreateInputDto} from '../../../src/blogs/dto/blog.input-dto';

describe('tests posts api', () => {
    const app = express();
    setupApp(app);

    beforeAll(async () => {
        await request(app).delete(TESTING_PATH).expect(HttpStatus.NoContent);
    })

    it('✅ should get empty array posts', async () => {
        await request(app).get(POSTS_PATH).expect(HttpStatus.Ok, [])
    })

    let createBlog1: Blog | null = null
    let createdPost1: Post | null = null
    let createdPost2: Post | null = null



    it('✅ should create post 1 with correct input data', async () => {
        const newBlog: BlogCreateInputDto = {
            name: "For post",
            description: "For post",
            websiteUrl: "https://YclbAtsmRVN9adx5jaB8jL9F_7pPhgc6L5wVKH4-BBNE1iq3q-HrFQmuKNWD9PnVMNLwbhGmCOrB.tW6X26Yt1I6zzfF",
        }

        const blog = await request(app).post(BLOGS_PATH).send(newBlog).expect(HttpStatus.Created);

        createBlog1 = blog.body

        const newPost: PostCreateInputDto = {
            title: "test1",
            shortDescription: "test1",
            content: "test1",
            blogId: createBlog1!.id
        }

        const res: { body: Post } = await request(app).post(POSTS_PATH).send(newPost).expect(HttpStatus.Created)

        createdPost1 = res.body

        expect(createdPost1).toEqual(expect.objectContaining(newPost))
    })
    it('✅ should create post 2 with correct input data', async () => {
        const newPost: PostCreateInputDto = {
            title: "test2",
            shortDescription: "test2",
            content: "test2",
            blogId: createBlog1!.id
        }

        const res: { body: Post } = await request(app).post(POSTS_PATH).send(newPost).expect(HttpStatus.Created)

        createdPost2 = res.body

        expect(createdPost2).toEqual(expect.objectContaining(newPost))

        await request(app).get(POSTS_PATH).expect(HttpStatus.Ok, [createdPost1, createdPost2])
    })

    it('✅ should get posts by id', async () => {
        await request(app).get(`${POSTS_PATH}/${createdPost1?.id}`).expect(HttpStatus.Ok, createdPost1)
        await request(app).get(`${POSTS_PATH}/${createdPost2?.id}`).expect(HttpStatus.Ok, createdPost2)
    })

    it('✅ should update post with correct data', async () => {
        const updatedPost: PostUpdateInputDto = {
            title: "qwe",
            shortDescription: "qwe",
            content: "qwe",
            blogId: createBlog1!.id
        }

        await request(app).put(`${POSTS_PATH}/${createdPost1?.id}`).send(updatedPost).expect(HttpStatus.NoContent)

        if(createdPost1) {
            createdPost1 = {
                ...createdPost1,
                ...updatedPost
            }
        }

        expect(createdPost1).toEqual(expect.objectContaining(updatedPost))
    })

    it('✅ should delete post with correct id', async () => {
        await request(app).delete(`${POSTS_PATH}/${createdPost1?.id}`).expect(HttpStatus.NoContent)
        await request(app).delete(`${POSTS_PATH}/${createdPost2?.id}`).expect(HttpStatus.NoContent)

        await request(app).get(POSTS_PATH).expect(HttpStatus.Ok, [])
    })
})