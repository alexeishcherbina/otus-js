const Article = require('../models/article');
const User = require('../models/user');
const Order = require('../models/order');

module.exports = {

  /**
   * CREATE ARTICLE - 
   * @param { name, description, price, discount} ArticleInput
   * @returns Article
   * 
   * @mutation 
   * mutation createArticle {
      createArticle(articleInput: { name: "Test Article 1",description: "Test Article",price: 10,discount: 10}){
          _id,
          name,
          description,
          price,
          discount
      }
     }
   */
  createArticle: async function ({ articleInput }) {
    const article = new Article({
      name: articleInput.name,
      description: articleInput.description,
      price: articleInput.price,
      discount: articleInput.discount
    });
    const createdArticle = await article.save();
    return {
      ...createdArticle.toJSON(),
      _id: createdArticle._id.toString(),
    };
  },

  /**
   * READ: QUERY ALL ARTICLES - 
   * @returns Article 
   * { name, description, price, discount}
   * @query
   * 
     query allArticles {
      allArticles{_id, name, description, price, discount}
     }

   */
  allArticles: async function () {
    const articles = await Article.find();
    return articles.map((q) => {
          return {
            ...q.toJSON(),
            _id: q._id.toString(),
          };
        });
  },
  /**
   * READ: QUERY JUST DISCOUNTED ARTICLES - 
   * @returns Article 
   * { name, description, price, discount}
   * @query
   * 
     query discountArticles {
      discountArticles{_id, name, description, price, discount}
     }
   */
  discountArticles: async function() {
    const articles = await Article.find();
    const filteredArticles = articles.filter(q => q.discount > 0);

    return filteredArticles.map((q) => {
      return {
        ...q.toJSON(),
        _id: q._id.toString(),
      };
    });
  },
  /**
   * UPDATE ARTICLE - 
   * @param {id}, { name, description, price, discount} ID,ArticleInput
   * @returns Article
   * 
   * @mutation 
   * mutation updateArticle {
        updateArticle(id:"61ca1f8e78af3e3b3c14de30",articleInput: { name: "New Verson Test Article",description: "The Best Article",price: 1000}){
            _id,
            name,
            description,
            price,
            discount
        }
      }
   */
  updateArticle: async function ({ id, articleInput }) {
    const article = await Article.findById(id);
    if (!article) {
      throw new Error('Article Not found!');
    }
    article.name = articleInput.name;
    article.description = articleInput.description;
    article.price = articleInput.price;
    article.discount = articleInput.discount;

    const updatedArticle = await article.save();
    return {
      ...updatedArticle.toJSON(),
      _id: updatedArticle._id.toString(),
    };
  },
  /**
   * DELETE ARTICLE - 
   * @param {id} ID
   * @returns Article
   * 
   * @mutation 
   * mutation deleteArticle {
        deleteArticle(id: "61ca103289d18c0a1459b134"){
            _id,
            name,
            description,
            price,
            discount
        }
      }
   */
  deleteArticle: async function ({ id }) {
    const article = await Article.findById(id);
    if (!article) {
      throw new Error('Article Not found!');
    }
    await Article.findByIdAndRemove(id);
    return {
      ...article.toJSON(),
      _id: article._id.toString(),
    };
  },
  /**
   * CREATE USER - 
   * @param { firstName, lastName, discount} UserInput
   * @returns User
   * 
   * @mutation 
   *  mutation createUser {
        createUser(userInput: { firstName: "Super", lastName: "Man", discount: 99}){
          _id,
          firstName,
          lastName,
          discount
        }
      }
   */
  createUser: async function({ userInput }) {
    const user = new User({
      firstName: userInput.firstName,
      lastName: userInput.lastName,
      discount: userInput.discount
    });
    const createdUser = await user.save();
    return {
      ...createdUser.toJSON(),
      _id: createdUser._id.toString(),
    };
  },
  /**
   * READ: QUERY ALL USERS - 
   * @returns USER 
   * { firstName, lastName, discount }
   * @query
   * 
     query allUsers {
      allUsers{_id, firstName, lastName, discount}
     }

   */
  allUsers: async function() {
    const users = await User.find();
    return users.map((q) => {
      return {
        ...q.toJSON(),
        _id: q._id.toString(),
      };
    });
  },
  /**
   * UPDATE USER - 
   * @param {id}, { firstName, lastName, discount} ID,UserInput
   * @returns User
   * 
   * @mutation 
   *  mutation updateUser {
        updateUser(id: "61ca2362cea17746c4474850", userInput: { firstName: "Super-Puper", lastName: "Man", discount: 100}){
          _id,
          firstName,
          lastName,
          discount
        }
      }
   */
  updateUser: async function ({ id, userInput }) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User Not found!');
    }
    user.firstName = userInput.firstName;
    user.secondName = userInput.secondName;
    user.discount = userInput.discount;

    const updatedUser = await user.save();
    return {
      ...updatedUser.toJSON(),
      _id: updatedUser._id.toString(),
    };
  },
  /**
   * CREATE ORDER - 
   * @param { items, userId} OrderInput
   * @returns Order
   * 
   * @mutation 
   *  mutation createOrder {
        createOrder(orderInput: {items: ["61ca1f8e78af3e3b3c14de30", "61ca129fdbc71f3d60d202e0"], userId: "61ca2362cea17746c4474850"}) {
          _id
          items
          userId
        }
      }
   */
  createOrder: async function({ orderInput}) {
    const order = new Order({
      items: orderInput.items,
      userId: orderInput.userId
    });
    const createdOrder = await order.save();
    return {
      ...createdOrder.toJSON(),
      _id: createdOrder._id.toString(),
    };
  },
  /**
   * READ: QUERY ALL ORDERS - 
   * @returns ORDER 
   * { items, userId }
   * @query
   *  query allOrders {
        allOrders {
          _id
          items
          userId
        }
      }
   */
  allOrders: async function() {
    const orders = await Order.find();
    return orders.map((q) => {
      return {
        ...q.toJSON(),
        _id: q._id.toString(),
      };
    });
  },
  /**
   * UPDATE ORDER - 
   * @param {id}, { items, userId} ID,OrderInput
   * @returns User
   * 
   * @mutation 
   *  mutation updateOrder {
        updateOrder(id: "61ca1902742e5744f03fa480", orderInput: {items: ["61ca129fdbc71f3d60d202e0"], userId: "61ca2362cea17746c4474850"}) {
          _id
          items
          userId
        }
      }
   */
  updateOrder: async function({ id, orderInput}) {
    const order = await Order.findById(id);
    if (!order) {
      throw new Error('Order Not found!');
    }
    order.items = orderInput.items;
    order.userId = orderInput.userId;

    const updatedOrder = await order.save();
    return {
      ...updatedOrder.toJSON(),
      _id: updatedOrder._id.toString(),
    };
  }
};
