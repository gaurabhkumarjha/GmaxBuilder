const BookingSchema = require("../Models/UserSchema");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');







exports.SubmitBookingDetails = async (req, res) => {

    try {
        const { VisiterDate, VisiterTime, VisitType, TotalNumberOfPersons, LeaderName, AssociateName, MobileNumber, PickUpLocation, ClientDetails, TotalNumberOfMales, TotalNumberOfFemales, VehicalDetails, TravellerDetails } = req.body

        const NewBookingObj = new BookingSchema({
            Date: VisiterDate,
            Time: VisiterTime,
            Visit_Type: VisitType,
            Total_Number_Of_Persons: TotalNumberOfPersons,
            Leader: LeaderName,
            Associate: AssociateName,
            MobileNumber,
            PickUp_Location: PickUpLocation,
            Client_Details: ClientDetails,
            Total_number_Of_Male: TotalNumberOfMales,
            Total_number_Of_Female: TotalNumberOfFemales,
            Vehical_Details: VehicalDetails,
            Traveller_Details: TravellerDetails
        });
        await NewBookingObj.save();
        return res.status(201).json({ message: "Booking saved", NewBookingObj });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Error occured:- Code 500" });
    }
}


exports.GetBookingDetails = async (req, res) => {

    try {
        const BookedDetails = await BookingSchema.find();
        return res.status(200).json({ BookedDetails });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Error occured:- Code 500" });
    }
}

exports.Delete_Booking = async (req, res) => {

    try {
        const { id } = req.params;
        const Deletedbooking = await BookingSchema.findByIdAndDelete({ _id: id });
        return res.status(200).json({ Deletedbooking });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Error occured:- Code 500" });
    }
}

const Mail_Sender = async (Recemail) => {

    const token = jwt.sign({ Recemail }, 'dsgcgdgcuggyfgewfgefgewc', { expiresIn: '2h' });
    const Link = `http://localhost:8000/site-visit-form/${token}`

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gouravkumarjhaa@gmail.com',
            pass: 'lbhsljdnamhigbrz'
        }
    });

    try {
        var mailOptions = {
            from: 'gouravkumarjhaa@gmail.com',
            to: Recemail, // Reci.
            cc: 'vinnisingh076q0761@gmail.com', // cc
            subject: 'Site Visit Link. 🔗',
            html: `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Site Visit Form</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  background-color: #f4f4f9;
                  margin: 0;
                  padding: 0;
                }
                .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                  text-align: center;
                  margin-bottom: 20px;
                }
                .email-header h1 {
                  font-size: 24px;
                  color: #007bff;
                }
                .email-body {
                  text-align: left;
                }
                .email-body p {
                  margin: 10px 0;
                }
                .email-footer {
                  text-align: center;
                  margin-top: 20px;
                  font-size: 12px;
                  color: #777;
                }
                .cta-button {
                  display: inline-block;
                  padding: 10px 20px;
                  font-size: 16px;
                  color: #ffffff;
                  background-color: #007bff;
                  text-decoration: none;
                  border-radius: 5px;
                  margin: 10px 0;
                }
                .cta-button:hover {
                  background-color: #0056b3;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="email-header">
                  <h1>Site Visit Form</h1>
                </div>
                <div class="email-body">
                  <p>Hi,</p>
                  <p>You have been invited to fill out a site visit form. Please click the button below to access the form.</p>
                  <p><a href=${Link} class="cta-button">Fill the Form</a></p>
                  <p>This link is valid for 2 hours only. If you have any questions, feel free to reach out to us.</p>
                </div>
                <div class="email-footer">
                  <p>&copy; 2024 GMAX Builder Home Pvt. Ltd. All rights reserved.</p>
                  <p style="color: #999;">This is an automated message. Please do not reply directly to this email.</p>
                </div>
              </div>
            </body>
            </html>`
        }
        await transporter.sendMail(mailOptions);
        // console.log(`Email sent`);
    } catch (error) {
        console.log(`Failed to send email to owner ${error.message}`);
    }
}
exports.Share_Visiter_Form_Via_Link = async (req, res) => {
    try {
        const { Recemail } = req.body;
        // console.log(Recemail);
        Mail_Sender(Recemail) // Sent email func
        return res.status(201).json({ message: "Mail Transfered to Mailer function" });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Error occured:- Code 500" });
    }
}
exports.Open_Site_Visit_Form = async (req, res) => {
    try {
        res.render("index")
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Error occured:- Code 500" });
    }
}

exports.Save_Opened_Site_Visit_Form = async (req, res) => {
    try {
        const { VisiterDate, VisiterTime, VisitType, TotalNumberOfPersons, LeaderName, AssociateName, MobileNumber, PickUpLocation, ClientDetails, TotalNumberOfMales, TotalNumberOfFemales, VehicalDetails, TravellerDetails } = req.body

        const NewBookingObj = new BookingSchema({
            Date: VisiterDate,
            Time: VisiterTime,
            Visit_Type: VisitType,
            Total_Number_Of_Persons: TotalNumberOfPersons,
            Leader: LeaderName,
            Associate: AssociateName,
            MobileNumber,
            PickUp_Location: PickUpLocation,
            Client_Details: ClientDetails,
            Total_number_Of_Male: TotalNumberOfMales,
            Total_number_Of_Female: TotalNumberOfFemales,
            Vehical_Details: VehicalDetails,
            Traveller_Details: TravellerDetails
        });
        await NewBookingObj.save();
        return res.status(201).json({ message: "Booking successfully saved in our database. Thank you!", NewBookingObj });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: "Error occured:- Code 500" });
    }
}
