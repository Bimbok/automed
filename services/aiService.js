const axios = require("axios");

exports.analyzeQuality = async (qualityParams) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/analyze",
            qualityParams
        );
        return response.data;
    } catch (err) {
        console.error("Error calling AI service:", err);
        return { success: false, reason: "AI service error" };
    }
};
