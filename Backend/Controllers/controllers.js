const BookingSchema = require("../Models/UserSchema");









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