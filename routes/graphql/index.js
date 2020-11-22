/*
 * Reference: https://circleci.com/ja/blog/custom-docker-02/
 */
const express = require('express');
const router = express.Router();

const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const resolvers = require('./resolvers');


router.use(
  '/',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
  })
);


module.exports = router;
