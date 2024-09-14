// server.js
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const ProductAPI = require('./product_api');

const knexConfig = {
    client: 'pg',
    connection: {
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        ssl: {
            rejectUnauthorized: false
        },
        application_name: 'apollo'
    },
    pool: { min: 0, max: 3 },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        productAPI: new ProductAPI(knexConfig),
    }),
    introspection: true,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});