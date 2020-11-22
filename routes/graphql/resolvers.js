const {Users} = require('./data')


const resolvers = {
  users: async (_) => {
    return Users;
  },
  user: async ({ id }, context) => {
    return Users.find((user) => user.id == id)
  }
};


module.exports = resolvers;
