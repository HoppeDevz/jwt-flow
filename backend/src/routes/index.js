const router = require("express").Router();
const account_controller = require("../controllers/account_controller");
const jwt_middleware = require("../middleware/auth");

router.get("/login", account_controller.Login);
router.post("/register", account_controller.Register);
router.get("/jwt_validation", jwt_middleware, account_controller.VerifyTokenAuthenticationStatus);

module.exports = router