import { blogsCollection, postsCollection } from "../../db/mongo.db";

export const testingRepository = {
  async cleanDB(): Promise<void> {
    await blogsCollection.deleteMany({});
    await postsCollection.deleteMany({});
  },
};
