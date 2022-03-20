import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors'
import { schema } from '../../graphql/schema';
import { createContext } from '../../graphql/context';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const microCors = Cors()


const apolloServer = new ApolloServer({
    schema,
    context: createContext,

    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ],

});


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

