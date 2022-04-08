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
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const review = await db.SpotReview.create(req.body);
    res.json(review);
  })
);

router.patch(
  "/:id",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { comment, rating } = req.body;
    const review = await db.SpotReview.findByPk(+req.body.id);
    console.log(review, "BEFORE");
    await review.update({
      rating,
      comment,
    });
    console.log(review, "AFTER");
    res.json(review);
  })
);

router.delete(
  "/:id",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const review = await db.SpotReview.findByPk(req.params.id);
    await review.destroy();
    res.json(review);
  })
);

module.exports = router;
