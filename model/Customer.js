const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
  email: String,
  password: String,
  phone: String,
  address: [],
  orders: [{ type: Schema.Types.ObjectId, ref: 'order', }],
});
module.exports = mongoose.model("customer", CustomerSchema);
