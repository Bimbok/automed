from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai
import json
import csv
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure the Gemini API with your API key
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("No GEMINI_API_KEY found. Set it in your .env file or environment variables.")

genai.configure(api_key=GEMINI_API_KEY)

# Initialize the Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')

# Function to save results to CSV
def save_to_csv(data, result):
    """Save medicine data and analysis results to CSV file"""
    csv_file = "medicine_analysis_results.csv"
    file_exists = os.path.isfile(csv_file)
    
    # Get current timestamp
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Prepare row data
    row = {
        'timestamp': timestamp,
        'name': data.get('name', 'Unknown'),
        'batchNumber': data.get('batchNumber', 'Unknown'),
        'expiryDate': data.get('expiryDate', 'Unknown'),
        'chemical_stability': data.get('chemical_stability', ''),
        'contamination_level': data.get('contamination_level', ''),
        'ph_level': data.get('ph_level', ''),
        'sterility_index': data.get('sterility_index', ''),
        'temperature_exposure': data.get('temperature_exposure', ''),
        'moisture_content': data.get('moisture_content', ''),
        'result': result.get('result', ''),
        'confidence': result.get('confidence', ''),
        'explanation': result.get('explanation', '')
    }
    
    # Write to CSV
    with open(csv_file, mode='a', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=row.keys())
        
        # Write header if file doesn't exist
        if not file_exists:
            writer.writeheader()
            
        writer.writerow(row)
    
    return True

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()

    # Expect all 6 parameters plus metadata
    required_fields = [
        "chemical_stability",
        "contamination_level",
        "ph_level",
        "sterility_index",
        "temperature_exposure",
        "moisture_content"
    ]
    
    try:
        # Check if all required fields are present
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Format the prompt for Gemini with specific industry standards context
        prompt = f"""
        You are a pharmaceutical quality control expert system. Analyze the quality of a medicine with the following parameters and determine if it is fit for storage and distribution:
        
        - Chemical stability: {data['chemical_stability']} (Ideal range: 0.85-1.0, where higher is better)
        - Contamination level: {data['contamination_level']} (Ideal range: 0.0-0.05, where lower is better)
        - pH level: {data['ph_level']} (Ideal range typically: 5.0-8.0, depending on medicine type)
        - Sterility index: {data['sterility_index']} (Ideal range: 0.95-1.0, where higher is better)
        - Temperature exposure: {data['temperature_exposure']} (Ideal range: 0.0-0.2, where lower indicates less temperature fluctuation)
        - Moisture content: {data['moisture_content']} (Ideal range: 0.0-0.1, where lower is typically better)
        
        Consider how these parameters interact with each other. For example, high contamination levels combined with high moisture content is particularly concerning.
        
        Respond with a JSON object containing exactly three fields:
        1. "result": either "Pass" or "Fail"
        2. "confidence": a number between 0 and 1 (formatted to 2 decimal places) indicating your confidence in the assessment
        3. "explanation": a concise, technical explanation of your decision, including which parameters were most concerning or reassuring
        
        Respond only with the JSON object, no additional text.
        """
        
        # Call the Gemini API
        response = model.generate_content(prompt)
        
        # Extract the JSON response
        try:
            # First try to parse the text as JSON directly
            result = json.loads(response.text)
        except json.JSONDecodeError:
            # If that fails, try to extract JSON from the text
            import re
            json_match = re.search(r'({.*})', response.text.replace('\n', ''), re.DOTALL)
            if json_match:
                result = json.loads(json_match.group(1))
            else:
                return jsonify({"error": "Failed to parse Gemini response as JSON"}), 500
        
        # Ensure the result has the expected fields
        if "result" not in result or "confidence" not in result or "explanation" not in result:
            return jsonify({"error": "Gemini response missing required fields"}), 500
        
        # Save results to CSV
        save_to_csv(data, result)
            
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/results', methods=['GET'])
def get_results():
    """Return all previously analyzed results"""
    csv_file = "medicine_analysis_results.csv"
    
    if not os.path.isfile(csv_file):
        return jsonify([])
    
    try:
        # Read CSV into list of dictionaries
        with open(csv_file, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            results = list(reader)
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({"status": "ok", "service": "medicine-quality-api"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)