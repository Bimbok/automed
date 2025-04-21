const Medicine = require("../models/medicine");
const aiService = require("../services/aiService");

exports.createMedicine = async (req, res) => {
    try {
        const { name, batchNumber, expiryDate, qualityParams } = req.body;
        const aiResult = await aiService.analyzeQuality(qualityParams);
        const medicine = new Medicine({
            name,
            batchNumber,
            expiryDate,
            qualityParams,
            aiResult,
        });
        await medicine.save();
        res.status(201).json(medicine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
