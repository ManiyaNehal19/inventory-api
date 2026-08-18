const router = require("express").Router();
const requireAuth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware")
const {registerSchema, loginSchema} = require("../validators/auth.validators")
const authfunctions = require("../controllers/auth.controller");
router.post("/login", validate(loginSchema),authfunctions.login);
router.post("/register",validate(registerSchema), authfunctions.register)
router.post("/refresh",authfunctions.refresh);
router.post("/logout", authfunctions.logout);
module.exports = router
