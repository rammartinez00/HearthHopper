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
router.get("/", async (req, res) => {
  const spots = await db.Spot.findAll({
    include: [
      {
        model: db.Picture,
      },
    ],
  });
  return res.json(spots);
});

router.post(
  "/new",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const spot = await db.Spot.build(req.body);
    await spot.save();
    console.log(spot);
    const image = await db.Picture.create({
      image: req.body.image,
      spotId: spot.id,
    });
    return res.json(spot);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const spot = await db.Spot.findByPk(+req.params.id, {
      include: [
        {
          model: db.Picture,
        },
      ],
    });
    return res.json(spot);
  })
);

module.exports = router;
