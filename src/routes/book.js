import * as controllers from "../controllers";
import express from "express";
import verifyToken from "../middlewares/verify_token";

const router = express.Router();

router.get("/", controllers.getBooks);

router.use(verifyToken);
// router.get("/", controllers.getCurrent);

module.exports = router;
