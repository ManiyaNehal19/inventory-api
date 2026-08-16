const ProductServices = require("../services/products.services");
// const 

exports.createproduct = async (req, res)=>{
    try {
        const {id, name, quantity, price, tags, main_category} = req.body;
        const newProduct = await ProductServices.createProduct(id, name, quantity, price, tags, main_category);
        res.status(200).json({message:"New Product Created: ",newProduct})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
   

}
exports.deleteproduct = async (req, res) => {
    try {
        const {id} = req.body;
        const deletedProduct = await ProductServices.deleteProduct(id);
        res.status(200).json({message:"Product Deleted: ",deletedProduct})
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
}

exports.updateProduct = async (req, res) =>{
    try {
        const {id, name, quantity, price, tags, main_category} = req.body;
        const updatedProduct = await ProductServices.updateProduct(id, name, quantity, price, tags, main_category);
        res.status(200).json({message:"Updated Product Successfully: ",updatedProduct})

        
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
}


exports.findproduct = async (req, res) => {
    try {
        const {id} = req.body;
        const foundProduct = await ProductServices.findProduct(id);
        res.status(200).json({message:"Product Found: ",foundProduct})
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
}