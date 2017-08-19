import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';

import { Schema } from './data/schema';
import { Mocks } from './data/mocks';

const GRAPHQL_PORT = 8080;
const app = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
});

addMockFunctionsToSchema({
  schema: executableSchema,
  mocks: Mocks,
  preserveResolvers: true,
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
