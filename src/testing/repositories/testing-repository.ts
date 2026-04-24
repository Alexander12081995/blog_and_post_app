import { db } from "../../db/in-memory.db";

export const testingRepository = {
  cleanDB() {
    db.blogs = [];
    db.posts = [];
  },
};
