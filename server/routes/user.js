const express = require("express");
const router = express.Router();
const Controller = require("../controllers/userContoller");
const authentication = require("../middlewares/authen");

router.post("/register", Controller.createUser);
router.post("/login", Controller.login);
router.use(authentication);
router.get("/users", Controller.getUsers);
router.delete("/delete/:id", Controller.deleteUser);
router.put("/update/:id", Controller.putUser);

module.exports = router;
