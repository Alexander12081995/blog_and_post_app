import { Blog } from "../blogs/types/blog.types";
import { Post } from "../posts/types/post.types";

export const db: { blogs: Blog[]; posts: Post[] } = {
  blogs: [
    {
      id: "1",
      name: "blog 1",
      description: "string",
      websiteUrl: "string",
      createdAt: "2026-04-24T05:00:15.884Z",
      isMembership: true,
    },
    {
      id: "2",
      name: "blog 2",
      description: "string",
      websiteUrl: "string",
      createdAt: "2026-04-24T05:00:15.884Z",
      isMembership: true,
    },
  ],
  posts: [],
};
