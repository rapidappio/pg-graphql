const resolvers = {
    Query: {
        products: async (_, __, { dataSources }) => {
            return dataSources.productAPI.getProducts();
        },
        product: async (_, { id }, { dataSources }) => {
            return dataSources.productAPI.getProductById(id);
        },
    },
    Mutation: {
        createProduct: async (_, { name, price, description }, { dataSources }) => {
            return dataSources.productAPI.createProduct({ name, price, description });
        },
        updateProduct: async (_, { id, name, price, description }, { dataSources }) => {
            const updatedProduct = { name, price, description };
            return dataSources.productAPI.updateProduct(id, updatedProduct);
        },
    },
};

module.exports = resolvers;