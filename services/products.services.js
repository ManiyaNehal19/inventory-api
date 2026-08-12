const Product = require("../models/product.model");

class ProductServices{
    static async createProduct(id, name, quantity, price, tags, main_category){
        try {
            const newProduct = new Product({id, name, quantity, price, tags, main_category})
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw error;
        }
    }
    static async deleteProduct(id){
        try {
            const deletebyid = await Product.findOneAndDelete({id: id})
            return deletebyid
        } catch (error) {
            throw error;
        }
    }
    static async updateProduct(id,name, quantity, price, tags, main_category){
        try {
            const updatedproduct = await Product.findOneAndUpdate(
                { id: id },
                { name: name, quantity: quantity, price: price, tags: tags, main_category: main_category },
                { new: true }
            );
            return updatedproduct;
        } catch (error) {
            throw error;
        }
    }
    static async findProduct(id){
        try {
            const product = await Product.findOne({id: id})
            return product;
        } catch (error) {
            throw error
        }
    }

}
module.exports = ProductServices
// export default ProductServices