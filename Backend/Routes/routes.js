const express = require('express');
const router = new express.Router();
const Controller= require('../Controllers/controllers');



router.post("/add/booking-site-details", Controller.SubmitBookingDetails);
router.get("/get/booking-site-details", Controller.GetBookingDetails);

router.delete("/delete/booked-site-details/:id", Controller.Delete_Booking);



module.exports = router;