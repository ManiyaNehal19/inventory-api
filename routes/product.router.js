const router = require("express").Router();
const productcontroller = require("../controllers/products.controllers");
router.post('/addproduct', productcontroller.createproduct);
router.get('/findproduct', productcontroller.findproduct);
router.delete('/deleteproduct', productcontroller.deleteproduct);
router.put('/updateproduct', productcontroller.updateProduct);
module.exports = router;