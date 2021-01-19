const Post = require('./models/Post');
const Keyword = require('./models/Keyword');
const Category = require('./models/Category');

const getModel = (model, info) => {
  switch (model) {
    case 'post':
      return new Post(info);
      break;
    case 'keyword':
      return new Keyword(info);
      break;
    case 'category':
      return new Category(info);
      break;
    default:
      break;
  }
};

const getMod = (model) => {
  switch (model) {
    case 'post':
      return Post;
      break;
    case 'keyword':
      return Keyword;
      break;
    case 'category':
      return Category;
      break;
    default:
      break;
  }
};

module.exports.getModel = getModel;
module.exports.getMod = getMod;
