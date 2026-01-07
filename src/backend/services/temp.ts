import { ObjectId } from "mongodb";
import { validCreateBlogPostFormData } from "../../../tests/data/formData";
import { DatabaseConnection } from "../db";
import { createBlogPost } from "./dashboardService";

await DatabaseConnection.connect(true);

const post = await createBlogPost(validCreateBlogPostFormData);

console.log(post)
const _post = await DatabaseConnection.posts.findById(new ObjectId(post._id))

console.log(_post);

// await DatabaseConnection.posts.deleteOne({_id: new ObjectId(post._id)})

await DatabaseConnection.close();