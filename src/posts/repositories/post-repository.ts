import {db} from '../../db/in-memory.db';
import {Post} from '../types/post.types';
import {PostCreateInputDto, PostUpdateInputDto} from '../dto/post.input-dto';

export const postRepository = {
    findAll(): Post[] {
        return db.posts
    },
    findById(id: string): Post | null {
        return db.posts.find(b => b.id === id) ?? null
    },
    create(dto: PostCreateInputDto): Post | null {
        const findBlog = db.blogs.find(b => b.id === dto.blogId)
        if (!findBlog) {
            return null;
        }

        const newPost: Post = {
            id: (new Date()).toISOString(),
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: findBlog.id,
            blogName: findBlog.name
        }
        db.posts.push(newPost)
        return newPost
    },
    update(id: string, dto: PostUpdateInputDto): boolean {
        const findBlog = db.blogs.find(b => b.id === dto.blogId)
        if (!findBlog) {
            return true
        }

        const findIndex = db.posts.findIndex(p => p.id === id);
        db.posts[findIndex] = {
            ...db.posts[findIndex],
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: findBlog.id,
            blogName: findBlog.name,
        }

        return false
    },
    delete(id: string): void {
        const postIndex = db.posts.findIndex(b => b.id === id);
        db.posts.splice(postIndex, 1);
    }
}