import express from "express";
import request from "supertest";
import { BlogCreateInputDto } from "../../../src/blogs/dto/blog.input-dto";
import { Blog } from "../../../src/blogs/types/blog.types";
import { BLOGS_PATH, POSTS_PATH, TESTING_PATH } from "../../../src/core/paths/paths";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { generateAdminAuthToken } from "../../../src/core/utils/generate-admin-auth-token";
import { PostCreateInputDto } from "../../../src/posts/dto/post.input-dto";
import { setupApp } from "../../../src/super-app";

describe("", () => {
  const app = express();
  setupApp(app);

  const adminToken = generateAdminAuthToken();

  beforeAll(async () => {
    await request(app).delete(TESTING_PATH).set("Authorization", adminToken).expect(HttpStatus.NoContent);
  });

  let createBlog1: Blog | null = null;
  let createBlog2: Blog | null = null;

  it("✅ should create two blogs and two post with correct data", async () => {
    const newBlog1: BlogCreateInputDto = {
      name: "For one post",
      description: "test",
      websiteUrl:
        "https://YclbAtsmRVN9adx5jaB8jL9F_7pPhgc6L5wVKH4-BBNE1iq3q-HrFQmuKNWD9PnVMNLwbhGmCOrB.tW6X26Yt1I6zzfF",
    };
    const newBlog2: BlogCreateInputDto = {
      name: "For two post",
      description: "test",
      websiteUrl:
        "https://YclbAtsmRVN9adx5jaB8jL9F_7pPhgc6L5wVKH4-BBNE1iq3q-HrFQmuKNWD9PnVMNLwbhGmCOrB.tW6X26Yt1I6zzfF",
    };

    const result1: { body: Blog } = await request(app)
      .post(BLOGS_PATH)
      .set("Authorization", adminToken)
      .send(newBlog1)
      .expect(HttpStatus.Created);
    createBlog1 = result1.body;
    const result2: { body: Blog } = await request(app)
      .post(BLOGS_PATH)
      .set("Authorization", adminToken)
      .send(newBlog2)
      .expect(HttpStatus.Created);
    createBlog2 = result2.body;

    const newPost1: PostCreateInputDto = {
      title: "post1",
      content: "test",
      shortDescription: "test",
      blogId: result1.body.id,
    };
    const newPost2: PostCreateInputDto = {
      title: "post2",
      content: "test",
      shortDescription: "test",
      blogId: result2.body.id,
    };

    await request(app).post(POSTS_PATH).set("Authorization", adminToken).send(newPost1).expect(HttpStatus.Created);
    await request(app).post(POSTS_PATH).set("Authorization", adminToken).send(newPost2).expect(HttpStatus.Created);
  });

  it("✅ should delete posts with blog", async () => {
    await request(app)
      .delete(`${BLOGS_PATH}/${createBlog1?.id}`)
      .set("Authorization", adminToken)
      .expect(HttpStatus.NoContent);
    await request(app)
      .delete(`${BLOGS_PATH}/${createBlog2?.id}`)
      .set("Authorization", adminToken)
      .expect(HttpStatus.NoContent);

    await request(app).get(POSTS_PATH).expect(HttpStatus.Ok, []);
  });
});
