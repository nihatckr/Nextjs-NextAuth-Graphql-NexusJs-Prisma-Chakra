import { ApolloServer, gql } from 'apollo-server-micro';
import Cors from 'micro-cors'

const microCors = Cors()

const typeDefs = gql`
   
  type Book {
    title: String
    author: String
  }
 
  type Query {
    books: [Book]
  }
`;
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });


const startServer = apolloServer.start()


export default microCors(async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }
    await startServer;
    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
})


export const config = {
    api: {
        bodyParser: false
    }
}

