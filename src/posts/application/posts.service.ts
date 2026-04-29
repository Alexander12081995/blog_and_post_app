import { WithId } from "mongodb";
import { blogRepository } from "../../blogs/repositories/blog-repository";
import { PostCreateInputDto, PostUpdateInputDto } from "../dto/post.input-dto";
import { postRepository } from "../repositories/post-repository";
import { Post } from "../types/post.types";

export const postsService = {
  async findAll(): Promise<WithId<Post>[]> {
    return postRepository.findAll();
  },

  async findById(id: string): Promise<WithId<Post>> {
    const post = await postRepository.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  },

  async create(dto: PostCreateInputDto): Promise<WithId<Post>> {
    const blog = await blogRepository.findById(dto.blogId);

    if (!blog) {
      throw new Error("Blog not found");
    }

    const newPost: Post = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId: dto.blogId,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };

    const post = await postRepository.create(newPost);

    if (!post) {
      throw new Error("Post not created");
    }

    return post;
  },

  async update(id: string, dto: PostUpdateInputDto): Promise<void> {
    const post = await postRepository.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    const blog = await blogRepository.findById(dto.blogId);

    if (!blog) {
      throw new Error("Blog not found");
    }

    await postRepository.update(id, dto, blog.name);

    return;
  },

  async delete(id: string): Promise<void> {
    const post = await postRepository.findById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    await postRepository.delete(id);

    return;
  },
};
