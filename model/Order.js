const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  amount: Number,
  customerId: String,
  Product: [{

    _id: { type: String, require: true },
    name: { type: String },
    description: { type: String },
    type: { type: String },
    unit: { type: Number },
    price: { type: Number },
    suplier: { type: String },
  }]
});
module.exports = mongoose.model("order", OrderSchema);
