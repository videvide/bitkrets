import { ObjectId } from "mongodb";
import type {
  CreateBlogPostFormData,
  DeleteBlogPostFormData,
  EditBlogPostFormData,
} from "../../types/bitkrets";
import {
  validateCreateBlogPostFormData,
  validateDeleteBlogPostFormData,
  validateEditBlogPostFormData,
} from "../../utils/validate";
import { DatabaseConnection } from "../db";

const FormError = new Error("Invalid form data");

// function that creates the blog object, and return the newly created object
export async function createBlogPost(
  createBlogPostFormData: CreateBlogPostFormData
) {
  return await DatabaseConnection.posts.insertOne({
    blogTitle: createBlogPostFormData.blogTitle,
    blogText: createBlogPostFormData.blogText,
  });
}

// create blog post service
export async function createBlogPostService(formData: CreateBlogPostFormData) {
  // validate form data
  if (!validateCreateBlogPostFormData(formData)) {
    // här kan vi kasta ett validation error...
    throw FormError;
  }
  // detta kastar ett db error om det uppstår
  return await createBlogPost(formData);
}

// edit blog post
// ...
export async function editBlogPost(formData: EditBlogPostFormData) {
  const query = await DatabaseConnection.posts.updateOne(
    { _id: new ObjectId(formData.blogId) },
    {
      blogTitle: formData.blogTitle,
      blogText: formData.blogText,
    }
  );
  return query.modifiedCount === 1;
}

export async function editBlogPostService(formData: EditBlogPostFormData) {
  if (!validateEditBlogPostFormData(formData)) {
    throw FormError;
  }
  return await editBlogPost(formData);
}

// delete blog post
export async function deleteBlogPost(formData: DeleteBlogPostFormData) {
  const query = await DatabaseConnection.posts.deleteOne({_id: new ObjectId(formData.blogId)})
  return query.deletedCount === 1;
}

export async function deleteBlogPostService(formData: DeleteBlogPostFormData) {
  if(!validateDeleteBlogPostFormData(formData)) {
    throw FormError
  }
  return await deleteBlogPost(formData);
}