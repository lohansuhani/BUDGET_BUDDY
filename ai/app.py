# Flask API to serve the model
from tarfile import RECORDSIZE
from flask import Flask, request, jsonify 
import joblib 
import pandas as pd

app = Flask(__name__)

# Load the trained model
model = joblib.load('expense_prophet_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    periods = data['periods']  # Extract the "periods" value
    future = model.make_future_dataframe(periods=data['periods'])
    forecast = model.predict(future)
    return jsonify(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail().to_dict('records'))

if __name__ == '__main__':
    app.run(port=5001)