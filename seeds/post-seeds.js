const { Blog_posts } = require('../models');

const postData = [{
        title: 'mySQL2 vs. MongoDB',
        content: 'thoughts???',
        author: 1
    },
    {
        title: 'CRUD',
        content: 'Create, Read, Update, Delete',
        author: 1
    },
    {
        title: 'Best Deployment site?',
        content: 'I currently use Heroku, any suggestions?',
        author: 2
    }
];

const seedPosts = () => Blog_posts.bulkCreate(postData);

module.exports = seedPosts;

