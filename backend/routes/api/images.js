// const express = require("express");
// const asyncHandler = require("express-async-handler");

// const { setTokenCookie, restoreUser } = require("../../utils/auth");
// const db = require("../../db/models");
// const { check } = require("express-validator");
// const { handleValidationErrors } = require("../../utils/validation");
// const { requireAuth } = require("../../utils/auth");
// const csrf = require("csurf");
// const csrfProtection = csrf({ cookie: true });

// const router = express.Router();

// router.post(
//   "/new",
//   requireAuth,
//   asyncHandler(async (req, res) => {
//     const image = await db.Picture.create({
//       image: req.body.image,
//       spotId: req.body.spotId,
//     });
//     return res.json(image);
//   })
// );
// module.exports = router;
