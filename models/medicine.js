const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    name: String,
    batchNumber: String,
    expiryDate: Date,
    qualityParams: Object,
    aiResult: Object,
});

module.exports = mongoose.model("Medicine", medicineSchema);
