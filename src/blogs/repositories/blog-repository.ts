import {Blog} from '../types/blog.types';
import {db} from '../../db/in-memory.db';
import {BlogCreateInputDto, BlogUpdateInputDto} from '../dto/blog.input-dto';

export const blogRepository = {
    findAll(): Blog[] {
        return db.blogs
    },

    findById(id: string): Blog | null {
        return db.blogs.find(b => b.id === id) ?? null
    },

    create(dto: BlogCreateInputDto): Blog {
        const createBlog: Blog = {
            id: (new Date()).toISOString(),
            name: dto.name,
            description: dto.description,
            websiteUrl: dto.websiteUrl
        }

        db.blogs.push(createBlog);

        return createBlog
    },

    update(id: string, newBlog: BlogUpdateInputDto): void {
        const blogIndex = db.blogs.findIndex(b => b.id === id);

        db.blogs[blogIndex] = {
            ...db.blogs[blogIndex],
            ...newBlog
        }
    },

    delete(blogId: string): void {
        const blogIndex = db.blogs.findIndex(b => b.id === blogId);

        db.posts = db.posts.filter(p => p.blogId !== db.blogs[blogIndex].id)

        db.blogs.splice(blogIndex, 1);
    }
}