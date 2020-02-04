const aggregatePages = require('./src/utils/aggregatePages');
const generatePages = require('./src/utils/generatePages');

module.exports = generatePages([
  {
    url: '/',
    seo: {
      cover: '/assets/profile.jpg'
    }
  },
  { url: '/contact/' },
  { url: '/contact/success' },
  {
    url: '/blogs/',
    data: aggregatePages({
      folder: './content/blog/',
      fields: [
        'id',
        'metadata',
        { content: { max: 500 } }
      ]
    })
  },
  {
    url: '/blog/:name',
    data: './content/blog/:name'
  }
]);
