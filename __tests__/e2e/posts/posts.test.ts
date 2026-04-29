import express from "express";
import request from "supertest";
import { BlogCreateInputDto } from "../../../src/blogs/dto/blog.input-dto";
import { BlogViewModel } from "../../../src/blogs/types/blog-view-model";
import { BLOG_TESTING_PATH, POST_TESTING_PATH, TEST_TESTING_PATH } from "../../../src/core/paths/paths";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { generateAdminAuthToken } from "../../../src/core/utils/generate-admin-auth-token";
import { runDB } from "../../../src/db/mongo.db";
import { PostCreateInputDto, PostUpdateInputDto } from "../../../src/posts/dto/post.input-dto";
import { PostViewModel } from "../../../src/posts/types/post-view-model";
import { setupApp } from "../../../src/super-app";

describe("tests posts api", () => {
  const app = express();
  setupApp(app);

  const adminToken = generateAdminAuthToken();

  beforeAll(async () => {
    await runDB("mongodb://127.0.0.1:27017/test_db");
    await request(app).delete(TEST_TESTING_PATH).expect(HttpStatus.NoContent);
  });

  it("✅ should get empty array posts", async () => {
    await request(app).get(POST_TESTING_PATH).expect(HttpStatus.Ok, []);
  });

  let createBlog1: BlogViewModel | null = null;
  let createdPost1: PostViewModel | null = null;
  let createdPost2: PostViewModel | null = null;

  it("❌ shouldn't create post with incorrect input data", async () => {
    const invalidData: PostCreateInputDto = {
      title: "",
      content: "",
      shortDescription: "",
      blogId: "",
    };

    await request(app)
      .post(POST_TESTING_PATH)
      .set("Authorization", adminToken)
      .send(invalidData)
      .expect(HttpStatus.BadRequest);
  });
  it("❌ shouldn't create post with incorrect blogId", async () => {
    const invalidBlogId: PostCreateInputDto = {
      title: "asd",
      content: "asd",
      shortDescription: "asd",
      blogId: "qwe",
    };

    await request(app)
      .post(POST_TESTING_PATH)
      .set("Authorization", adminToken)
      .send(invalidBlogId)
      .expect(HttpStatus.NotFound);
  });

  it("✅ should create post 1 with correct input data", async () => {
    const newBlog: BlogCreateInputDto = {
      name: "For post",
      description: "For post",
      websiteUrl:
        "https://YclbAtsmRVN9adx5jaB8jL9F_7pPhgc6L5wVKH4-BBNE1iq3q-HrFQmuKNWD9PnVMNLwbhGmCOrB.tW6X26Yt1I6zzfF",
    };

    const blog = await request(app)
      .post(BLOG_TESTING_PATH)
      .set("Authorization", adminToken)
      .send(newBlog)
      .expect(HttpStatus.Created);

    createBlog1 = blog.body;

    const newPost: PostCreateInputDto = {
      title: "test1",
      shortDescription: "test1",
      content: "test1",
      blogId: createBlog1!.id,
    };

    const res: {
      body: PostViewModel;
    } = await request(app)
      .post(POST_TESTING_PATH)
      .set("Authorization", adminToken)
      .send(newPost)
      .expect(HttpStatus.Created);

    createdPost1 = res.body;

    expect(createdPost1).toEqual(expect.objectContaining(newPost));
  });

  it("✅ should create post 2 with correct input data", async () => {
    const newPost: PostCreateInputDto = {
      title: "test2",
      shortDescription: "test2",
      content: "test2",
      blogId: createBlog1!.id,
    };

    const res: {
      body: PostViewModel;
    } = await request(app)
      .post(POST_TESTING_PATH)
      .set("Authorization", adminToken)
      .send(newPost)
      .expect(HttpStatus.Created);

    createdPost2 = res.body;

    expect(createdPost2).toEqual(expect.objectContaining(newPost));

    await request(app).get(POST_TESTING_PATH).expect(HttpStatus.Ok, [createdPost1, createdPost2]);
  });

  it("❌ shouldn't get post incorrect id", async () => {
    await request(app).get(`${POST_TESTING_PATH}/${-100}`).expect(HttpStatus.NotFound);
  });

  it("✅ should get posts by id", async () => {
    await request(app).get(`${POST_TESTING_PATH}/${createdPost1?.id}`).expect(HttpStatus.Ok, createdPost1);
    await request(app).get(`${POST_TESTING_PATH}/${createdPost2?.id}`).expect(HttpStatus.Ok, createdPost2);
  });

  it("❌ shouldn't update post incorrect input data", async () => {
    const invalidData: PostUpdateInputDto = {
      title: "",
      content: "",
      shortDescription: "",
      blogId: "",
    };

    await request(app)
      .put(`${POST_TESTING_PATH}/1`)
      .set("Authorization", adminToken)
      .send(invalidData)
      .expect(HttpStatus.BadRequest);
  });
  it("❌ shouldn't update post incorrect blogId", async () => {
    const invalidData: PostUpdateInputDto = {
      title: "qwe",
      content: "qwe",
      shortDescription: "qwe",
      blogId: "qwe",
    };

    await request(app)
      .put(`${POST_TESTING_PATH}/${createdPost1?.id}`)
      .set("Authorization", adminToken)
      .send(invalidData)
      .expect(HttpStatus.NotFound);
  });
  it("❌ shouldn't update post incorrect id", async () => {
    const invalidData: PostUpdateInputDto = {
      title: "qwe",
      content: "qwe",
      shortDescription: "qwe",
      blogId: createBlog1!.id,
    };

    await request(app)
      .put(`${POST_TESTING_PATH}/${-100}`)
      .set("Authorization", adminToken)
      .send(invalidData)
      .expect(HttpStatus.NotFound);
  });

  it("✅ should update post with correct data", async () => {
    const updatedPost: PostUpdateInputDto = {
      title: "qwe",
      shortDescription: "qwe",
      content: "qwe",
      blogId: createBlog1!.id,
    };

    await request(app)
      .put(`${POST_TESTING_PATH}/${createdPost1?.id}`)
      .set("Authorization", adminToken)
      .send(updatedPost)
      .expect(HttpStatus.NoContent);

    if (createdPost1) {
      createdPost1 = {
        ...createdPost1,
        ...updatedPost,
      };
    }

    expect(createdPost1).toEqual(expect.objectContaining(updatedPost));
  });

  it("❌ shouldn't delete post with incorrect id", async () => {
    await request(app)
      .delete(`${POST_TESTING_PATH}/${-100}`)
      .set("Authorization", adminToken)
      .expect(HttpStatus.NotFound);
  });

  it("✅ should delete post with correct id", async () => {
    await request(app)
      .delete(`${POST_TESTING_PATH}/${createdPost1?.id}`)
      .set("Authorization", adminToken)
      .expect(HttpStatus.NoContent);
    await request(app)
      .delete(`${POST_TESTING_PATH}/${createdPost2?.id}`)
      .set("Authorization", adminToken)
      .expect(HttpStatus.NoContent);

    await request(app).get(POST_TESTING_PATH).expect(HttpStatus.Ok, []);
  });
});
