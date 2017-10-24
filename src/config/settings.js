/** @flow */

export default {
  server: {
    port: 8080,
  },
  database: {
    url: 'mongodb://localhost:27017/podcasts-graphql',
  },
  auth: {
    // @FIXME: Conceal in .env file
    secret: 'itunessecret',
  },
};
