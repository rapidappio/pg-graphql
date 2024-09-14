const { SQLDataSource } = require('datasource-sql');

class ProductAPI extends SQLDataSource {
    // Initialize with the products table
    getProducts() {
        return this.knex.select('*').from('products');
    }

    getProductById(id) {
        return this.knex('products').where({ id }).first();
    }

    updateProduct(id, product) {
        return this.knex('products')
            .where({ id })
            .update(product)
            .returning('*')
            .then(rows => rows[0]);
    }

    createProduct({ name, price, description }) {
        return this.knex('products')
            .insert({ name, price, description })
            .returning('*');
    }
}

module.exports = ProductAPI;