import { ObjectId, WithId } from "mongodb";
import { postsCollection } from "../../db/mongo.db";
import { PostUpdateInputDto } from "../dto/post.input-dto";
import { Post } from "../types/post.types";

export const postRepository = {
  async findAll(): Promise<WithId<Post>[]> {
    return postsCollection.find({}).toArray();
  },
  async findById(id: string): Promise<WithId<Post> | null> {
    return postsCollection.findOne({ _id: new ObjectId(id) });
  },
  async create(newPost: Post): Promise<WithId<Post>> {
    const insertResult = await postsCollection.insertOne(newPost);
    return { ...newPost, _id: insertResult.insertedId };
  },
  async update(id: string, dto: PostUpdateInputDto, blogName: string): Promise<void> {
    const updateResult = await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: dto.title,
          shortDescription: dto.shortDescription,
          content: dto.content,
          blogId: dto.blogId,
          blogName: blogName,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new Error("Post not found");
    }
    return;
  },
  async updateByBlogId(blogId: string, blogName: string): Promise<void> {
    await postsCollection.updateMany(
      {
        blogId: blogId,
      },
      {
        $set: {
          blogName: blogName,
        },
      },
    );
  },

  async delete(id: string): Promise<void> {
    const deleteResult = await postsCollection.deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount < 1) {
      throw new Error("Post not found");
    }

    return;
  },

  async deleteByBlogId(blogId: string): Promise<void> {
    await postsCollection.deleteMany({ blogId: blogId });
    return;
  },
};
