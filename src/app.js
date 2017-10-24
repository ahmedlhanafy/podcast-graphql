/** @flow */

import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import { schema, resolvers } from './graphql';
import config from './config/settings';

const app = express();
app.server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.database);

const executableSchema = makeExecutableSchema({
  typeDefs: [schema],
  resolvers,
});

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema: executableSchema,
    context: { token: req.headers['x-access-token'] },
  })),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

app.server.listen(process.env.PORT || config.server.port);
// eslint-disable-next-line no-console
console.log(`✨  Server running on port ${app.server.address().port}...`);
