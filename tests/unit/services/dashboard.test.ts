import { describe, expect, it } from "vitest";
import { createBlogPost, deleteBlogPost, editBlogPost } from "../../../src/backend/services/dashboardService";
import { invalidCreateBlogPostFormData, invalidDeleteBlogPostFormData, invalidEditBlogPostFormData, validCreateBlogPostFormData, validEditBlogPostFormData } from "../../data/formData";
import { DatabaseConnection } from "../../../src/backend/db";
import type { DeleteBlogPostFormData, EditBlogPostFormData } from "../../../src/types/bitkrets";
import { ObjectId } from "mongodb";

// test create blog
describe("test create blog post function", () => {
    it("should throw error on invalid data", async () => {
        await expect(createBlogPost(invalidCreateBlogPostFormData[0])).rejects.toThrowError();
    });
    it("should return valid database model instance on valid data", async () => {
        expect(await createBlogPost(validCreateBlogPostFormData)).toBeInstanceOf(DatabaseConnection.posts);
    })
})


// test edit blog post 
describe("test edit blog post function", () => {
    it("should throw error on invalid data", async () => {
        // kastar error oavsett 
        await expect(editBlogPost(invalidEditBlogPostFormData[0])).rejects.toThrowError();
    });
    it("should return true on successful edit", async () => {
        // skapa en att redigera 
        // ta det idt och passa vidare 
        const post = await createBlogPost(validCreateBlogPostFormData);
        const formData: EditBlogPostFormData = {
            // klagar på typen
            // vi ändrar imorgon
            // @ts-ignore
            blogId: new ObjectId(post._id),
            blogTitle: "Edited blog title",
            blogText: "Edited blog textt"
        }
        expect(await editBlogPost(formData)).toBe(true);
    });

})


// test delete blog post 
describe("test delete blog post function", () => {
    it("should throw error on invalid form data", async () => {
        await expect(deleteBlogPost(invalidDeleteBlogPostFormData)).rejects.toThrowError();
    })
    it("should return true on successful deletion", async () => {
        const post = await createBlogPost(validCreateBlogPostFormData);
        const formData: DeleteBlogPostFormData = {
            // samma här 
            // @ts-ignore
            blogId: new ObjectId(post._id),
        }
        expect(await deleteBlogPost(formData)).toBe(true);
    })
})

// https://mongoosejs.com/