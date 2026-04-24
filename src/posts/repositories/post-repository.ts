import { db } from "../../db/in-memory.db";
import { PostCreateInputDto, PostUpdateInputDto } from "../dto/post.input-dto";
import { Post } from "../types/post.types";

export const postRepository = {
  findAll(): Post[] {
    return db.posts;
  },
  findById(id: string): Post | null {
    return db.posts.find((b) => b.id === id) ?? null;
  },
  create(dto: PostCreateInputDto, blogName: string): Post {
    const newPost: Post = {
      id: new Date().toISOString(),
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId: dto.blogId,
      blogName: blogName,
    };
    db.posts.push(newPost);
    return newPost;
  },
  update(id: string, dto: PostUpdateInputDto, blogName: string): void {
    const findIndex = db.posts.findIndex((p) => p.id === id);
    db.posts[findIndex] = {
      ...db.posts[findIndex],
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId: dto.blogId,
      blogName: blogName,
    };
  },
  updateBlogNameForPosts(blogId: string, blogName: string) {
    db.posts.forEach((p) => {
      return p.blogId === blogId ? (p.blogName = blogName) : p;
    });
  },

  delete(id: string): void {
    const postIndex = db.posts.findIndex((b) => b.id === id);
    db.posts.splice(postIndex, 1);
  },
};
