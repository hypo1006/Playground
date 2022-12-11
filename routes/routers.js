const router = require("express").Router();
const controller = require("../controllers/controller");

router.get("/main", controller.mainView);

module.exports = router;