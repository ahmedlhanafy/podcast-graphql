import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import expressPlayground from 'graphql-playground-middleware-express';
import config from './config/settings';
import { schema, resolvers } from './graphql';

const PORT = process.env.PORT || 8080;

mongoose.connect(config.database);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const executableSchema = makeExecutableSchema({
  typeDefs: [schema],
  resolvers: resolvers,
});

app.use(
  '/graphql',
  bodyParser.json(),
  apolloExpress(req => ({
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

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

// tslint:disable:no-console
app.listen(PORT, () =>
  console.log(
    `Running a GraphQL API server at https://localhost:${PORT}/graphql`,
  ),
);
