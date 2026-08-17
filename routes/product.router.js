const router = require("express").Router();
const requireAuth = require("../middleware/auth.middleware")
const authorizeRole = require("../middleware/role.middleware")
const productcontroller = require("../controllers/products.controllers");
router.post('/addproduct', requireAuth, authorizeRole("admin"), productcontroller.createproduct);
router.get('/findproduct', requireAuth,authorizeRole("admin", "user"), productcontroller.findproduct);
router.delete('/deleteproduct', requireAuth, authorizeRole("admin"),productcontroller.deleteproduct);
router.put('/updateproduct', requireAuth,authorizeRole("admin"), productcontroller.updateProduct);
module.exports = router;