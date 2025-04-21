const express = require("express");
const router = express.Router();
const axios = require("axios");
const Medicine = require("../models/medicine");

router.post("/", async (req, res) => {
    const { name, batchNumber, expiryDate, qualityParams } = req.body;

    try {
        // Call AI microservice with all 6 parameters
        const aiRes = await axios.post(
            "http://localhost:8000/analyze",
            qualityParams
        );
        const aiResult = aiRes.data;

        const newMed = new Medicine({
            name,
            batchNumber,
            expiryDate,
            qualityParams,
            aiResult,
        });

        await newMed.save();
        res.status(201).json(newMed);
    } catch (err) {
        console.error("AI or DB error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const meds = await Medicine.find().sort({ createdAt: -1 });
        res.json(meds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
