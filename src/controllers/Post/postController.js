import Post from "../../models/PostModel.js";
import { Saveimages } from "../../services/imageservice.js";

export const createPost = async (req, res) => {
    const { content, createdby, posttitle, coverimage, keywords } = req.body;
    const extractImageUrls = (htmlContent) => {
        const imgRegex = /<img.*?src="(data:image\/.*?;base64,.*?)".*?>/g;
        const matches = htmlContent.matchAll(imgRegex);
        const imageUrls = [...matches].map(match => match[1]);
        return imageUrls;
    };
    const imageUrls = extractImageUrls(content);
    if (coverimage) {
        imageUrls.push(coverimage);
    }
    try {
        const savedImageUrls = await Promise.all(imageUrls.map(async (imageUrl) => {
            const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            const savedImageUrl = await Saveimages(buffer, 'images');
            return savedImageUrl;
        }));
        let updatedContent = content;
        savedImageUrls.forEach((savedUrl, index) => {
            if (index < savedImageUrls.length - 1) {
                updatedContent = updatedContent.replace(imageUrls[index], savedUrl);
            }
        });
        const savedCoverImage = savedImageUrls[savedImageUrls.length - 1];
        const newPost = new Post({ 
            content: updatedContent,
            createdby: createdby,
            posttitle: posttitle,
            coverimage: savedCoverImage,
            keywords: keywords,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
};

export const getblogposts = async (req, res, next) => {
    const { page = 1, pageSize = 10, search = '' } = req.query;
    const skip = (page - 1) * pageSize;
    try {
        const query = search ? { $or: [{ posttitle: { $regex: search, $options: 'i' } }, { content: { $regex: search, $options: 'i' } } , {keywords: {$regex: search, $options: 'i'}}] } : {};
        const totalPosts = await Post.countDocuments(query);
        const postData = await Post.find(query).skip(skip).limit(pageSize);
        res.send({ totalPosts, posts: postData });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get blog posts' });
    }
};

export const getviewblogposts = async (req, res, next) => {
    try {
        const Postdata = await Post.find();
        res.send(Postdata);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get blog posts' });
    }
};

export const getPostById = async (req, res,next) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { content, createdby, posttitle, coverimage, keywords } = req.body;
console.log(req.body)
    const extractImageUrls = (htmlContent) => {
        const imgRegex = /<img.*?src="(data:image\/.*?;base64,.*?)".*?>/g;
        const matches = htmlContent.matchAll(imgRegex);
        const imageUrls = [...matches].map(match => match[1]);
        return imageUrls;
    };

    const imageUrls = extractImageUrls(content);
    if (coverimage) {
        imageUrls.push(coverimage);
    }

    try {
        const savedImageUrls = await Promise.all(imageUrls.map(async (imageUrl) => {
            const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            const savedImageUrl = await Saveimages(buffer, 'images');
            return savedImageUrl;
        }));

        let updatedContent = content;
        savedImageUrls.forEach((savedUrl, index) => {
            if (index < savedImageUrls.length - 1) {
                updatedContent = updatedContent.replace(imageUrls[index], savedUrl);
            }
        });

        const savedCoverImage = savedImageUrls[savedImageUrls.length - 1];

        const updatedPost = await Post.findByIdAndUpdate(id, {
            content: updatedContent,
            createdby,
            posttitle,
            coverimage: savedCoverImage,
            keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords
        }, { new: true });

        res.status(200).json(updatedPost);
    } catch (error) {   
        res.status(500).json({ error: 'Failed to update post' });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        await Post.findByIdAndDelete(id);
        res.status(204).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
};