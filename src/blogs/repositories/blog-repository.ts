import { ObjectId, WithId } from "mongodb";
import { blogsCollection } from "../../db/mongo.db";
import { BlogUpdateInputDto } from "../dto/blog.input-dto";
import { Blog } from "../types/blog.types";

export const blogRepository = {
  async findAll(): Promise<WithId<Blog>[]> {
    const items = await blogsCollection.find({}).toArray();
    return items;
  },

  async findById(id: string): Promise<WithId<Blog>> {
    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
    if (!blog) {
      throw new Error("Blog not found");
    }

    return blog;
  },

  async create(newBlog: Blog): Promise<WithId<Blog>> {
    const insertResult = await blogsCollection.insertOne(newBlog);
    return { ...newBlog, _id: insertResult.insertedId };
  },

  async update(id: string, dto: BlogUpdateInputDto): Promise<void> {
    const updateResult = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: dto,
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new Error("Blog not exist");
    }
    return;
  },

  async delete(blogId: string): Promise<void> {
    const deleteResult = await blogsCollection.deleteOne({ _id: new ObjectId(blogId) });

    if (deleteResult.deletedCount < 1) {
      throw new Error("Blog not exist");
    }
    return;
  },
};
