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
    const spot = await db.Spot.create(req.body);
    const image = await db.Picture.create({
      image: req.body.image,
      spotId: spot.id,
    });

    const singleSpot = await db.Spot.findByPk(spot.id, {
      include: [
        {
          model: db.Picture,
        },
      ],
    });
    return res.json(singleSpot);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const spot = await db.Spot.findByPk(+req.params.id, {
      include: [db.Picture, db.SpotReview],
    });
    // console.log(spot);
    return res.json(spot);
  })
);

router.put("/:id/edit", async (req, res) => {
  const id = req.params.id;
  const spot = await db.Spot.findByPk(+id, {
    include: [
      {
        model: db.Picture,
      },
    ],
  });
  await spot.update(req.body);
  const image = await db.Picture.create({
    image: req.body.image,
    spotId: spot.id,
  });
  return res.json(spot);
});

router.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  const spot = await db.Spot.findByPk(+id);
  await spot.destroy({ options: { cascade: true } });
  return res.json(spot.id);
});

module.exports = router;
