const mongoose = require("mongoose")
const Schema = mongoose.Schema
const AddressSchema = new Schema({
    country: String,
    city: String,
    street: String,
    doorCode: String,
    fullAddress: String
});

module.exports = mongoose.model('address', AddressSchema);