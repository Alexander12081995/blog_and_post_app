import { WithId } from "mongodb";
import { postRepository } from "../../posts/repositories/post-repository";
import { BlogCreateInputDto, BlogUpdateInputDto } from "../dto/blog.input-dto";
import { blogRepository } from "../repositories/blog-repository";
import { Blog } from "../types/blog.types";

export const blogsService = {
  async findAll(): Promise<WithId<Blog>[]> {
    return blogRepository.findAll();
  },

  async findById(id: string): Promise<WithId<Blog>> {
    const blog = await blogRepository.findById(id);
    if (!blog) {
      throw new Error("Blog not found");
    }

    return blog;
  },

  async create(dto: BlogCreateInputDto): Promise<WithId<Blog>> {
    const newBlog: Blog = {
      name: dto.name,
      description: dto.description,
      websiteUrl: dto.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };

    const res = await blogRepository.create(newBlog);
    return res;
  },

  async update(id: string, dto: BlogUpdateInputDto): Promise<void> {
    const blog = await blogRepository.findById(id);
    if (!blog) {
      throw new Error("Blog not found");
    }

    await blogRepository.update(id, dto);
    await postRepository.updateByBlogId(id, dto.name);
    return;
  },

  async delete(id: string): Promise<void> {
    const blog = await blogRepository.findById(id);
    if (!blog) {
      throw new Error("Blog not found");
    }

    await blogRepository.delete(id);
    await postRepository.deleteByBlogId(id);
    return;
  },
};
