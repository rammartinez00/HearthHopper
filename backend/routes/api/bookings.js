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
  asyncHandler(async (req, res) => {
    const { startDate, endDate, spotId, userId } = req.body;
    const startArr = startDate.split("-");
    const endArr = endDate.split("-");
    const startYear = startArr[0];
    const startMonth = startArr[1];
    const startDay = startArr[2];
    const endYear = endArr[0];
    const endMonth = endArr[1];
    const endDay = endArr[2];
    const spot = await db.Spot.findByPk(+spotId);
    const newPrice = parseInt(spot.price);

    // creating the date 1 with sample input date.
    const date1 = new Date(+startYear, +startMonth, +startDay);

    // creating the date 2 with sample input date.
    const date2 = new Date(+endYear, +endMonth, +endDay);

    // getting milliseconds for both dates
    const date1InMs = date1.getTime();
    const date2InMs = date2.getTime();

    // getting the diff between two dates.
    let timeDiff = 0;
    if (date1InMs > date2InMs) {
      timeDiff = date1InMs - date2InMs;
    } else {
      timeDiff = date2InMs - date1InMs;
    }

    // converting diff into days
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    const totalPrice = daysDiff * newPrice;
    const booking = await db.SpotBooking.create({
      startDate,
      endDate,
      spotId,
      userId,
      totalPrice,
    });
    return res.json(booking);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const booking = await db.SpotBooking.findByPk(+req.params.id);
    await booking.update(req.body);
    res.json(booking);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const booking = await db.SpotBooking.findByPk(+req.params.id);
    await booking.destroy();
    res.json(booking);
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const bookings = await db.SpotBooking.findAll({
      include: [db.Spot, db.User],
    });
    res.json(bookings);
  })
);

module.exports = router;
