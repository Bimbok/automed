from flask import Flask, request, jsonify
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pandas as pd

app = Flask(__name__)

# Load dataset
df = pd.read_csv("medicine_quality_dataset.csv")
X = df.drop("quality_pass", axis=1)
y = df["quality_pass"]

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Save model (optional)
# joblib.dump(model, "quality_model.pkl")

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()

    # Expect all 6 parameters
    required_fields = [
        "chemical_stability",
        "contamination_level",
        "ph_level",
        "sterility_index",
        "temperature_exposure",
        "moisture_content"
    ]
    
    try:
        values = [float(data[field]) for field in required_fields]
        prediction = model.predict([values])[0]
        confidence = model.predict_proba([values]).max()

        return jsonify({
            "result": "Pass" if prediction == 1 else "Fail",
            "confidence": f"{confidence:.2f}"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(port=8000)
