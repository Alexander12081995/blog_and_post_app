import express from "express";
import request from "supertest";
import {
    BlogCreateInputDto,
    BlogUpdateInputDto
} from "../../../src/blogs/dto/blog.input-dto";
import {Blog} from "../../../src/blogs/types/blog.types";
import {BLOGS_PATH, TESTING_PATH} from "../../../src/core/paths/paths";
import {HttpStatus} from "../../../src/core/types/http-statuses";
import {setupApp} from "../../../src/super-app";

describe("tests blogs api", () => {
    const app = express();
    setupApp(app);

    beforeAll(async () => {
        await request(app).delete(TESTING_PATH).expect(HttpStatus.NoContent);
    });

    it("✅ should return empty array blogs", async () => {
        await request(app).get(BLOGS_PATH).expect(HttpStatus.Ok).expect([]);
    });

    let createBlog1: Blog | null = null;
    let createBlog2: Blog | null = null;
    it("✅ should create a blog 1 with correct data", async () => {
        const newBlog: BlogCreateInputDto = {
            name: "test1",
            description: "test1",
            websiteUrl: "https://YclbAtsmRVN9adx5jaB8jL9F_7pPhgc6L5wVKH4-BBNE1iq3q-HrFQmuKNWD9PnVMNLwbhGmCOrB.tW6X26Yt1I6zzfF"
        };

        const result: { body: Blog } = await request(app)
            .post(BLOGS_PATH)
            .send(newBlog)
            .expect(HttpStatus.Created);
        createBlog1 = result.body;

        expect(createBlog1).toEqual(expect.objectContaining(newBlog));

        await request(app).get(BLOGS_PATH).expect(HttpStatus.Ok, [createBlog1]);
    });
    it("✅ should create a blog 2 with correct data", async () => {
        const newBlog: BlogCreateInputDto = {
            name: "test2",
            description: "test2",
            websiteUrl: "https://YclbAtsmRVN9adx5jaB8jL9F_7pPhgc6L5wVKH4-BBNE1iq3q-HrFQmuKNWD9PnVMNLwbhGmCOrB.tW6X26Yt1I6zzfF"
        };

        const result: { body: Blog } = await request(app)
            .post(BLOGS_PATH)
            .send(newBlog)
            .expect(HttpStatus.Created);
        createBlog2 = result.body;

        expect(createBlog2).toEqual(expect.objectContaining(newBlog));

        await request(app)
            .get(BLOGS_PATH)
            .expect(HttpStatus.Ok, [createBlog1, createBlog2]);
    });
    it("✅ should return a blog with correct id", async () => {
        await request(app)
            .get(`${BLOGS_PATH}/${createBlog1?.id}`)
            .expect(HttpStatus.Ok, createBlog1);
        await request(app)
            .get(`${BLOGS_PATH}/${createBlog2?.id}`)
            .expect(HttpStatus.Ok, createBlog2);
    });
    it("✅ should update blog with correct input data", async () => {
        const updatedData: BlogUpdateInputDto = {
            name: "qwe",
            description: "qwe",
            websiteUrl: "qwe"
        };
        await request(app)
            .put(`${BLOGS_PATH}/${createBlog1?.id}`)
            .send(updatedData)
            .expect(HttpStatus.NoContent);

        if (createBlog1) {
            createBlog1 = {
                ...createBlog1,
                ...updatedData
            };
        }
        expect(createBlog1).toEqual(expect.objectContaining(updatedData));
    });
    it("✅ should delete blog with correct id", async () => {
        await request(app)
            .delete(`${BLOGS_PATH}/${createBlog1?.id}`)
            .expect(HttpStatus.NoContent);
        await request(app)
            .delete(`${BLOGS_PATH}/${createBlog2?.id}`)
            .expect(HttpStatus.NoContent)

        await request(app).get(BLOGS_PATH).expect(HttpStatus.Ok, []);
    });
});
