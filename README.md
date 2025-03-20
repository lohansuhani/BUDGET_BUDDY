# Smart Budget Tracker
A 24-hour hackathon project for PromptX 2025 by Dev Bhoomi Uttarakhand University.

## Features
- Manual Expense Entry
- Real-time Data Storage (MongoDB)
- Pie Chart Visualization (Chart.js)
- AI-driven Budget Suggestions (Simulated)
- Edit & Delete Transactions
- Mobile Responsive

## Setup
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Set up MongoDB locally or use a cloud instance (update `.env` with `MONGO_URI`)
4. Run the app: `npm start`
5. Visit `http://localhost:5000` in your browser.

## Tech Stack
- Frontend: HTML, CSS, JS, EJS, Chart.js
- Backend: Node.js, Express.js, MongoDB

## Step 3: Test the Flask API Independently
Before integrating with the Node.js backend, test the Flask API to ensure it works as expected.

## Start the Flask API:
python ai/app.py

Use Postman or curl to send a POST request to the /predict endpoint:

URL: http://localhost:5001/predict

Method: POST

## Headers: 
Content-Type: application/json

## Body (raw JSON):

json
{
  "periods": 30
}

## If the API is working, you should receive a response like this:

## json


  {
    "ds": "2023-11-01T00:00:00.000Z",
    "yhat": 1500,
    "yhat_lower": 1400,
    "yhat_upper": 1600
  },
  {
    "ds": "2023-11-02T00:00:00.000Z",
    "yhat": 1600,
    "yhat_lower": 1500,
    "yhat_upper": 1700
  }

## Step 1: Start the Python Flask API
Open a terminal and navigate to the ai folder:
cd C:\Users\asus\Desktop\smartbudget\ai

## Start the Flask API:
python app.py
You should see output like this:
* Running on http://127.0.0.1:5001/ (Press CTRL+C to quit)
Keep this terminal open and running.

## Step 2: Start the Node.js Backend
Open a new terminal and navigate to the root of your project:
cd C:\Users\asus\Desktop\smartbudget

## Start the Node.js backend:
node server.js
You should see output like this:
Server running on port 5000
MongoDB Connected
Keep this terminal open and running.

## Open your browser and navigate to:
http://localhost:5000
You should see the Smart Budget Tracker dashboard.