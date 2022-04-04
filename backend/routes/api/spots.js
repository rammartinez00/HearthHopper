const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const db = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

const router = express.Router();
// router.get(
//   "/new",
//   requireAuth,
//   csrfProtection,
//   asyncHandler(async (req, res) => {})
// );

router.post(
  "/new",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    console.log(req.body);
    const spot = await db.Spot.create(req.body);
    return res.json(spot);
  })
);

module.exports = router;
