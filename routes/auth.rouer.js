const router = require("express").Router();
const requireAuth = require("../middleware/auth.middleware");
const authfunctions = require("../controllers/auth.controller");
router.post("/login", authfunctions.login);
router.post("/register", authfunctions.register)
router.post("/refresh",authfunctions.refresh);
router.post("/logout", authfunctions.logout);
// router.get("/test/protected", requireAuth, (req, res) => {
//   res.status(200).json({ message: "You are authenticated", userId: req.userId });
// });
module.exports = router
