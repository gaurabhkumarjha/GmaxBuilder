const mongoose = require("mongoose")


const BookingsitevisitSchema = new mongoose.Schema({

    Date: {
        type: String,
        required: true
    },

    Time: {
        type: String,
        required: true
    },

    Visit_Type: {
        type: String,
        required: true
    },
    Total_Number_Of_Persons: {
        type: String,
        required: true
    },
    Leader: {
        type: String,
        required: true
    },
    Associate: {
        type: String,
        required: true
    },
    MobileNumber: {
        type: String,
        required: true
    },
    PickUp_Location: {
        type: String,
        required: true
    },
    Client_Details: {
        type: String,
        required: true
    },
    Total_number_Of_Male: {
        type: String,
        required: true
    },
    Total_number_Of_Female: {
        type: String,
        required: true
    },
    Vehical_Details: {
        type: String,
        required: true
    },
    Traveller_Details: {
        type: String,
        required: true
    },
})
const BookingsitevisitSchemadb = mongoose.model('BookingsitevisitSchemadb', BookingsitevisitSchema);
module.exports = BookingsitevisitSchemadb;