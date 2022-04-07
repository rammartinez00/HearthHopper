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

router.post(
  "/new",
  asyncHandler(async (req, res, next) => {
    const booking = await db.Booking.create(req.body);
    res.json(booking);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const booking = await db.Booking.findByPk(+req.params.id);
    await booking.update(req.body);
    res.json(booking);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const booking = await db.Booking.findByPk(+req.params.id);
    await booking.destroy();
    res.json(booking);
  })
);

module.exports = router;
