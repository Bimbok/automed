# Medicine Quality Analysis API Setup Guide

This guide will walk you through setting up and running the Medicine Quality Analysis API that uses Google's Gemini AI to evaluate medicine quality parameters.

## Prerequisites

- Python 3.8 or higher
- A Google Gemini API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))
- Basic familiarity with terminal/command prompt

## Step 1: Create a Virtual Environment

A virtual environment is an isolated Python environment that keeps dependencies for different projects separate.

### For Windows:

```cmd
# Navigate to your project folder
cd path\to\your\project

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
venv\Scripts\activate
```

### For macOS/Linux:

```bash
# Navigate to your project folder
cd path/to/your/project

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate
```

## Step 2: Install Dependencies

With your virtual environment activated, install the required packages:

```bash
pip install -r requirements.txt
```

## Step 3: Configure Environment Variables

1. Create a `.env` file from the template:

```bash
cp .env.template .env
```

2. Edit the `.env` file and replace `your_gemini_api_key_here` with your actual Google Gemini API key.

## Step 4: Run the Application

With the environment set up, run the Flask application:

```bash
python app.py
```

The server will start running at `http://localhost:8000`.

## API Endpoints

### Analyze Medicine Quality

**Endpoint**: `POST /analyze`

**Request Body**:

```json
{
  "name": "Medicine Name",
  "batchNumber": "ABC123",
  "expiryDate": "2025-01-01",
  "chemical_stability": 0.95,
  "contamination_level": 0.02,
  "ph_level": 6.5,
  "sterility_index": 0.98,
  "temperature_exposure": 0.05,
  "moisture_content": 0.03
}
```

**Response**:

```json
{
  "result": "Pass",
  "confidence": 0.92,
  "explanation": "The medicine has excellent chemical stability (0.95) and sterility index (0.98), with low contamination (0.02). All parameters are within acceptable ranges."
}
```

### Get All Results

**Endpoint**: `GET /results`

Retrieves all previously analyzed medicine data from the CSV file.

### Health Check

**Endpoint**: `GET /health`

Simple health check to verify the API is running.

## Connecting a Frontend

Here's how to connect your frontend to this API:

1. Make sure your frontend sends POST requests to the `/analyze` endpoint with the required parameters.

2. Example frontend JavaScript code to connect to the API:

```javascript
async function analyzeMedicine(medicineData) {
  try {
    const response = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicineData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error analyzing medicine:", error);
    throw error;
  }
}

// Example usage:
const medicineData = {
  name: "Antibiotic X",
  batchNumber: "LOT123456",
  expiryDate: "2025-06-30",
  chemical_stability: 0.92,
  contamination_level: 0.03,
  ph_level: 7.2,
  sterility_index: 0.97,
  temperature_exposure: 0.08,
  moisture_content: 0.05,
};

analyzeMedicine(medicineData)
  .then((result) => {
    console.log("Analysis result:", result);
    // Update your UI with the result
  })
  .catch((error) => {
    // Handle error in UI
  });
```

## Troubleshooting

1. **API Key Issues**: If you get authentication errors, double-check your `.env` file and make sure the API key is correct.

2. **CORS Errors**: The API has CORS enabled, but if you're still facing CORS issues from your frontend, ensure your frontend is properly configured to make cross-origin requests.

3. **JSON Parsing Errors**: Ensure your frontend is sending properly formatted JSON data.

4. **Server Not Starting**: Check that port 8000 is not already in use by another application.

## Data Storage

All analysis results are saved to a file named `medicine_analysis_results.csv` in the same directory as the application. This allows you to keep a record of all medicines analyzed and their results.
