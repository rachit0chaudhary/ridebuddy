const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currentHoldingSchema = new Schema({
   Amount: {
       type: Number,
       required: true
   }}, { timestamps: true });

module.exports = mongoose.model('CurrentHolding', currentHoldingSchema)