const express = require('express');
const router = new express.Router();
const Controller= require('../Controllers/controllers');



router.post("/add/booking-site-details", Controller.SubmitBookingDetails);
router.get("/get/booking-site-details", Controller.GetBookingDetails);

router.delete("/delete/booked-site-details/:id", Controller.Delete_Booking);

router.post("/share-site-visit-link", Controller.Share_Visiter_Form_Via_Link); // this routes sent the link into given email id.


router.get("/site-visit-form/:token", Controller.Open_Site_Visit_Form); // Open Form Via Link.
router.post("/site-visit-form/:token", Controller.Save_Opened_Site_Visit_Form); // Save Form.



module.exports = router;