# Flask API to serve the model

import pandas as pd
from prophet import Prophet
import joblib
from datetime import datetime

# Load data
df = pd.read_csv('ai/expenses.csv')
df['date'] = df['date'].apply(lambda x: datetime.strptime(x.split(' GMT')[0], '%a %b %d %Y %H:%M:%S'))
df = df.rename(columns={'date': 'ds', 'amount': 'y'})

# Train model
model = Prophet()
model.fit(df)

# Save model
joblib.dump(model, 'expense_prophet_model.pkl')
print("Model trained and saved!")