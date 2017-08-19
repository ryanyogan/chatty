import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';

import { Resolvers as resolvers } from './data/resolvers';
import { Schema as typeDefs } from './data/schema';

const GRAPHQL_PORT = 8080;
const app = express();

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema: executableSchema,
    context: {}, // Must be empty object at a minimum
  }),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

const graphQLServer = createServer(app);

graphQLServer.listen(
  GRAPHQL_PORT,
  () =>
    console.log(`Server is now running at http://localhost:${GRAPHQL_PORT}`), // eslint-disable-line
);
