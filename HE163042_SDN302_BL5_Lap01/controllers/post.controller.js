const posts = require('../data_sample/posts.json');
const users = require('../data_sample/users.json');

exports.getAllPosts = async (req, res, next) => {
    try {
        const result = posts
            .map(post => {
                const user = users.find(u => u.id === post.userId);
                const writerByUser = user ? `${user.firstName} ${user.lastName}` : 'User No Name';


                return {
                    postId: post.id,
                    postTitle: post.title,
                    body: post.body.substring(0, 20) + '...',
                    writerByUser: writerByUser
                };
            })
            .filter(post => post !== null);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.postId);
        const post = posts.find(p => p.id === postId);

        const result = {
            postId: post.id,
            postTitle: post.title,
            body: post.body,
            tag: post.tags || []
        };

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.getAllTags = async (req, res, next) => {
    try {
        
        const allTags = posts
            .map(post => post.tags)
            .flat();

        const uniqueTags = [...new Set(allTags)];
        res.status(200).json(uniqueTags);
    } catch (error) {
        next(error);
    }
};

exports.getLikeDescanding = async (req, res, next) => {
    try {
        const { n } = req.params;

        const numPosts = parseInt(n, 10);

        
        const sortedPosts = posts
            .sort((a, b) => b.likes - a.likes) 
            .slice(0, numPosts);

        const result = sortedPosts.map(post => {
            const user = users.find(u => u.id === post.userId);
            const writerByUser = user ? `${user.firstName} ${user.lastName}` : 'User No Name';

            return {
                postId: post.id,
                postTitle: post.title,
                body: post.body.substring(0, 20) + '...',
                writerByUser: writerByUser
            };
        });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};