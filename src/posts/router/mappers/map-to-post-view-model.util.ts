import { WithId } from "mongodb";
import { PostViewModel } from "../../types/post-view-model";
import { Post } from "../../types/post.types";

export const mapToPostViewModel = (post: WithId<Post>): PostViewModel => {
  return {
    id: post._id.toString(),
    title: post.title,
    content: post.content,
    shortDescription: post.shortDescription,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt,
  };
};
