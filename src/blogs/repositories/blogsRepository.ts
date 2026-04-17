import {Blog} from '../types/blog.types';
import {db} from '../../db/in-memory.db';
import {BlogCreateInputDto, BlogUpdateInputDto} from '../dto/blog.input-dto';

export const blogsRepository = {
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

        if (blogIndex === -1) {
            throw new Error("Blog not found");
        }

        db.blogs[blogIndex] = {
            ...db.blogs[blogIndex],
            ...newBlog
        }

        return
    },

    delete(id: string): void {
        const blogIndex = db.blogs.findIndex(b => b.id === id);

        if (blogIndex === -1) {
            throw new Error("Blog not found");
        }

        db.blogs.splice(blogIndex, 1);
        return
    }
}