import { blogPostFormSubmitType } from "../../src/constants";
import type { CreateBlogPostFormData, DeleteBlogPostFormData, EditBlogPostFormData } from "../../src/types/bitkrets";

export const invalidCreateBlogPostFormData: CreateBlogPostFormData[] = [
  {
    blogTitle: "This is a valid blog title",
    // invalid blog text
    blogText: "",
    submitType: blogPostFormSubmitType.create,
  },
  {
    // invalid blog title
    blogTitle: "",
    blogText: "This is valid blog text",
    submitType: blogPostFormSubmitType.create,
  },
  {
    blogTitle: "This is valid blog title",
    blogText: "This is valid blog text",
    // invalid submit type
    submitType: "",
  },
];

// valid CreateBlogPostFormData
export const validCreateBlogPostFormData: CreateBlogPostFormData = {
  blogTitle: "Valid blog title",
  blogText: "Valid blog text",
  submitType: blogPostFormSubmitType.create,
};


// invalid EditBlogPostFormData
export const invalidEditBlogPostFormData: EditBlogPostFormData[] = [
  {
    // invalid blogId
    blogId: "asd",
    blogTitle: "This is a valid blog title",
    blogText: "Valid blog text",
    submitType: blogPostFormSubmitType.edit,
  },
  {
    blogId: "123",
    // invalid blog title
    blogTitle: "",
    blogText: "This is valid blog text",
    submitType: blogPostFormSubmitType.edit,
  },
  {
    blogId: "123",
    blogTitle: "Valid blog title",
    // invalid blog text
    blogText: "",
    submitType: blogPostFormSubmitType.edit,
  },
  {
    blogId: "123",
    blogTitle: "This is valid blog title",
    blogText: "This is valid blog text",
    // invalid submit type
    submitType: "",
  },
];

// valid EditBlogPostFormData
export const validEditBlogPostFormData: EditBlogPostFormData = {
  blogId: "123",
  blogTitle: "This is valid blog title",
  blogText: "Valid blog text",
  submitType: blogPostFormSubmitType.edit,
};

// invalid DeleteBlogPostFormData
export const invalidDeleteBlogPostFormData: DeleteBlogPostFormData = {
  blogId: "asd",
  submitType: blogPostFormSubmitType.delete
}

// valid DeleteBlogPostFormData
export const validDeleteBlogPostFormData: DeleteBlogPostFormData = {
  blogId: "123",
  submitType: blogPostFormSubmitType.delete
}