import mongoose from "mongoose";
import db from "../config/db/db.js";

const PostSchema = mongoose.Schema({
    title: { type: String },
    content: { type: String },
    images: [{ type: String }],
    posttitle: {type: String},
    createdby: {type: String},
    keywords: {type: String},
    coverimage: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Post = db.model('posts', PostSchema);
export default Post;
