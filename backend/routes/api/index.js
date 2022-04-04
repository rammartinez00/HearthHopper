const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/spots", spotsRouter);

// GET /api/set-token-cookie
const asyncHandler = require("express-async-handler");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");

module.exports = router;
