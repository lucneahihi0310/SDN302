const posts = require('../data_sample/posts.json');
const users = require('../data_sample/users.json');


// exports.getPostByName = async (req, res, next) => {
//     try {
//         const userId = parseInt(req.params.userId); 
//         const user = users.find(u => u.id === userId);
//         if (!user || !user.firstName || !user.lastName) {
//             return res.status(404).json({ message: 'User not found or missing name' });
//         }

//         const userPosts = posts
//             .filter(post => post.userId === userId)
//             .map(post => ({
//                 postId: post.id,
//                 postTitle: post.title,
//                 body: post.body,
//                 tag: post.tags || []
//             }));

//         const result = [{
//             userWriter: `${user.firstName} ${user.lastName}`,
//             posts: userPosts
//         }];

//         res.status(200).json(result);
//     } catch (error) {
//         next(error);  
//     }
// };

exports.getPostByName = async (req, res, next) => {
    try {
        const { firstName } = req.params;

        if (!firstName) {
            return res.status(400).json({ message: 'Missing firstName in params' });
        }

        const matchedUsers = users.filter(
            user => user.firstName.toLowerCase() === firstName.toLowerCase() && user.lastName
        );

        if (matchedUsers.length === 0) {
            return res.status(404).json({ message: 'No users found with that first name' });
        }

        const result = matchedUsers.map(user => {
            const userPosts = posts
                .filter(post => post.userId === user.id)
                .map(post => ({
                    postId: post.id,
                    postTitle: post.title,
                    body: post.body,
                    tag: post.tags || []
                }));

            return {
                userWriter: `${user.firstName} ${user.lastName}`,
                posts: userPosts
            };
        });

        res.status(200).json(result);
    } catch (error) {
        next(error);  
    }
};