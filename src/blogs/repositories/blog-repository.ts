import { ObjectId, WithId } from "mongodb";
import { blogsCollection } from "../../db/mongo.db";
import { BlogUpdateInputDto } from "../dto/blog.input-dto";
import { Blog } from "../types/blog.types";

export const blogRepository = {
  async findAll(): Promise<WithId<Blog>[]> {
    return blogsCollection.find({}).toArray();
  },

  async findById(id: string): Promise<WithId<Blog> | null> {
    return blogsCollection.findOne({ _id: new ObjectId(id) });
  },

  async create(newBlog: Blog): Promise<WithId<Blog>> {
    const insertResult = await blogsCollection.insertOne(newBlog);
    return { ...newBlog, _id: insertResult.insertedId };
  },

  async update(id: string, dto: BlogUpdateInputDto): Promise<void> {
    const updateResult = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: dto.name,
          description: dto.description,
          websiteUrl: dto.websiteUrl,
        },
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
