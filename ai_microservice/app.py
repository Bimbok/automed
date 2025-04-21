# ai_microservice/app.py
from flask import Flask, request, jsonify
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import os

app = Flask(__name__)

# Dummy model training (normally you'd load a pre-trained model)
def train_dummy_model():
    X = np.array([
        [5.0, 7.0], [3.2, 4.1], [6.1, 8.0], [1.2, 2.3], [7.4, 9.1]
    ])
    y = [1, 0, 1, 0, 1]  # 1 = Passed quality, 0 = Failed
    model = RandomForestClassifier()
    model.fit(X, y)
    joblib.dump(model, 'quality_model.pkl')

if not os.path.exists('quality_model.pkl'):
    train_dummy_model()

model = joblib.load('quality_model.pkl')

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json  # should be something like { "param1": 5.5, "param2": 6.8 }
        features = np.array([[data['param1'], data['param2']]])
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][prediction]
        return jsonify({
            'result': 'Pass' if prediction == 1 else 'Fail',
            'confidence': round(float(probability), 2)
        })
    except Exception as e:
        return jsonify({ 'error': str(e) }), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)
