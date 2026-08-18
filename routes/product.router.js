const router = require("express").Router();
const requireAuth = require("../middleware/auth.middleware")
const authorizeRole = require("../middleware/role.middleware")
const productcontroller = require("../controllers/products.controllers");
const {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
} = require("../validators/product.validator")
const validate = require("../middleware/validate.middleware")

router.post('/addproduct', requireAuth, authorizeRole("admin"), validate(createProductSchema), productcontroller.createproduct);
router.get('/findproduct', requireAuth,authorizeRole("admin", "user"), validate(productIdSchema),productcontroller.findproduct);
router.delete('/deleteproduct', requireAuth, authorizeRole("admin"), validate(productIdSchema), productcontroller.deleteproduct);
router.put('/updateproduct', requireAuth,authorizeRole("admin"),validate(updateProductSchema),productcontroller.updateProduct);
module.exports = router;