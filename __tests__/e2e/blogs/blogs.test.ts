import express from "express";
import request from "supertest";
import {BlogCreateInputDto, BlogUpdateInputDto} from "../../../src/blogs/dto/blog.input-dto";
import {Blog} from "../../../src/blogs/types/blog.types";
import {BLOGS_PATH, TESTING_PATH} from "../../../src/core/paths/paths";
import {HttpStatus} from "../../../src/core/types/http-statuses";
import {setupApp} from "../../../src/super-app";
import {generateAdminAuthToken} from '../../../src/core/utils/generate-admin-auth-token';

describe("tests blogs api", () => {
    const app = express();
    setupApp(app);

    const adminToken = generateAdminAuthToken();

    beforeAll(async () => {
        await request(app).delete(TESTING_PATH).expect(HttpStatus.NoContent);
    });

    it("✅ should return empty array blogs", async () => {
        await request(app).get(BLOGS_PATH).expect(HttpStatus.Ok).expect([]);
    });

    let createBlog1: Blog | null = null;
    let createBlog2: Blog | null = null;

    it("❌ shouldn't create blog with incorrect input data", async () => {
        const invalidBlog: BlogCreateInputDto = {
            name: "",
            description: "",
            websiteUrl: ""
        }

        const res = await request(app).post(BLOGS_PATH).set('Authorization', adminToken).send(invalidBlog).expect(HttpStatus.BadRequest);
        expect(res.body).toHaveProperty("errorsMessages")
        expect(Array.isArray(res.body.errorsMessages)).toBe(true)
    })


    it("✅ should create a blog 1 with correct data", async () => {
        const newBlog: BlogCreateInputDto = {
            name: "test1",
            description: "test1",
            websiteUrl: "https://YclbAtsmRVN9adx5jaB8jL9F_7pPhgc6L5wVKH4-BBNE1iq3q-HrFQmuKNWD9PnVMNLwbhGmCOrB.tW6X26Yt1I6zzfF"
        };

        const result: { body: Blog } = await request(app)
            .post(BLOGS_PATH)
            .set('Authorization', adminToken)
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
            .set('Authorization', adminToken)
            .send(newBlog)
            .expect(HttpStatus.Created);
        createBlog2 = result.body;

        expect(createBlog2).toEqual(expect.objectContaining(newBlog));

        await request(app)
            .get(BLOGS_PATH)
            .expect(HttpStatus.Ok, [createBlog1, createBlog2]);
    });

    it("❌ shouldn't return blog with incorrect id", async () => {
        await request(app).get(`${BLOGS_PATH}/123`).expect(HttpStatus.NotFound)
    })

    it("✅ should return a blog with correct id", async () => {
        await request(app)
            .get(`${BLOGS_PATH}/${createBlog1?.id}`)
            .expect(HttpStatus.Ok, createBlog1);
        await request(app)
            .get(`${BLOGS_PATH}/${createBlog2?.id}`)
            .expect(HttpStatus.Ok, createBlog2);
    });

    it("❌ shouldn't update blog with incorrect id", async () => {
        const updatedData: BlogUpdateInputDto = {
            name: "qwe",
            description: "qwe",
            websiteUrl: "https://YclbAtsmRVN9adx5jaB8jL9F_7pPhgc6L5wVKH4-BBNE1iq3q-HrFQmuKNWD9PnVMNLwbhGmCOrB.tW6X26Yt1I6zzfF"
        };
        await request(app).put(`${BLOGS_PATH}/${-100}`).set('Authorization', adminToken).send(updatedData).expect(HttpStatus.NotFound)
    })
    it("❌ shouldn't update blog with incorrect input data", async () => {
        const updatedData: BlogUpdateInputDto = {
            name: "",
            description: "",
            websiteUrl: ""
        };
        await request(app).put(`${BLOGS_PATH}/${-100}`).set('Authorization', adminToken).send(updatedData).expect(HttpStatus.BadRequest)
    })

    it("✅ should update blog with correct input data", async () => {
        const updatedData: BlogUpdateInputDto = {
            name: "qwe",
            description: "qwe",
            websiteUrl: "https://YclbAtsmRVN9adx5jaB8jL9F_7pPhgc6L5wVKH4-BBNE1iq3q-HrFQmuKNWD9PnVMNLwbhGmCOrB.tW6X26Yt1I6zzfF"
        };
        await request(app)
            .put(`${BLOGS_PATH}/${createBlog1?.id}`)
            .set('Authorization', adminToken)
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

    it("❌ shouldn't delete blog with incorrect id", async () => {
        await request(app).delete(`${BLOGS_PATH}/${-100}`).set('Authorization', adminToken).expect(HttpStatus.NotFound)
    })

    it("✅ should delete blog with correct id", async () => {
        await request(app)
            .delete(`${BLOGS_PATH}/${createBlog1?.id}`)
            .set('Authorization', adminToken)
            .expect(HttpStatus.NoContent);
        await request(app)
            .delete(`${BLOGS_PATH}/${createBlog2?.id}`)
            .set('Authorization', adminToken)
            .expect(HttpStatus.NoContent)

        await request(app).get(BLOGS_PATH).expect(HttpStatus.Ok, []);
    });
});
