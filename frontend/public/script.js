document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm) {
        expenseForm.addEventListener('submit', addExpense);
    }
    fetchExpenses(); // Fetch expenses on page load
});

async function fetchExpenses() {
    const response = await fetch('/api/expenses');
    const expenses = await response.json();
    displayExpenses(expenses);
    renderChart(expenses);
    checkBudgetAlerts(expenses);
}

async function addExpense(e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    const response = await fetch('/api/expenses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, category, paymentMethod }),
    });

    if (response.ok) {
        window.location.href = '/'; // Redirect to dashboard
    } else {
        alert('Error adding expense');
    }
}

function displayExpenses(expenses) {
    const expenseList = document.getElementById('expenseList');
    if (!expenseList) return; // Avoid errors on add-expense page
    expenseList.innerHTML = expenses.length > 0 
        ? expenses.map(exp => `
            <div class="expense-item" data-id="${exp._id}">
                <span>${exp.category}: ₹${exp.amount} (${exp.paymentMethod}) - ${new Date(exp.date).toDateString()}</span>
                <div>
                    <button onclick="editExpense('${exp._id}')">Edit</button>
                    <button onclick="deleteExpense('${exp._id}')">Delete</button>
                </div>
            </div>
        `).join('')
        : '<p>No expenses added yet.</p>';
}

async function deleteExpense(id) {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    const response = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
    if (response.ok) fetchExpenses();
}


async function editExpense(id) {
    const amount = prompt('Enter new amount', '');
    const category = prompt('Enter new category', '');
    const paymentMethod = prompt('Enter new payment method', '');
    if (amount && category && paymentMethod) {
        const response = await fetch(`/api/expenses/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, category, paymentMethod }),
        });
        if (response.ok) fetchExpenses();
    }
}

let expenseChart = null; // Store chart instance
function renderChart(expenses) {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    // Destroy the old chart if it exists
    if (window.myChart) {
        window.myChart.destroy();
    }

    const categories = [...new Set(expenses.map(exp => exp.category))];
    const data = categories.map(cat =>
        expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0)
    );

    window.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#F1C40F', '#2ECC71', '#9B59B6']
            }]
        },
        options: {
            responsive: false, // Stops auto-resizing
            maintainAspectRatio: false, // Prevents unwanted stretching
            animation: false, // No weird resizing animations
        }
    });

    console.log("Chart updated:", data);
}




function checkBudgetAlerts(expenses) {
    const alertDiv = document.getElementById('alerts');
    if (!alertDiv) return; // Avoid errors on add-expense page
    alertDiv.innerHTML = '';
    const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const categorySpending = {};
    expenses.forEach(exp => {
        categorySpending[exp.category] = (categorySpending[exp.category] || 0) + exp.amount;
    });

    if (totalSpending > 5000) {
        alertDiv.innerHTML += '<div class="alert">Warning: Total spending exceeded ₹5000! Reduce expenses.</div>';
    }
    for (const [cat, amount] of Object.entries(categorySpending)) {
        if (amount > 2000) {
            alertDiv.innerHTML += `<div class="alert">Overspending in ${cat}: ₹${amount}. Suggestion: Cut back on ${cat}.</div>`;
        }
    }
}
// Fetch predictions from the backend
async function fetchPredictions() {
    try {
      const response = await fetch('/api/predict-expenses');
      const predictions = await response.json();
      renderPredictions(predictions);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  }
  
  // Render predictions using Chart.js
  function renderPredictions(predictions) {
    const ctx = document.getElementById('predictionChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: predictions.map(p => p.ds),
        datasets: [{
          label: 'Predicted Expenses',
          data: predictions.map(p => p.yhat),
          borderColor: '#36A2EB',
          fill: false,
        }]
      },
      options: { responsive: true }
    });
  }
  
  // Call fetchPredictions on page load
  document.addEventListener('DOMContentLoaded', () => {
    fetchPredictions();
  });
  let isDarkMode = false;

function toggleTheme() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.body.style.background = '#333';
    document.body.style.color = '#f2f2f2';
    document.querySelector('.theme-toggle').style.background = '#666';
    document.querySelector('.theme-toggle').style.color = '#fff';
    document.querySelector('.theme-toggle').textContent = 'Light Mode';
  } else {
    document.body.style.background = '#f2f2f2';
    document.body.style.color = '#333';
    document.querySelector('.theme-toggle').style.background = '#4CAF50';
    document.querySelector('.theme-toggle').style.color = '#fff';
    document.querySelector('.theme-toggle').textContent = 'Dark Mode';
  }
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("KhabriKahani Loaded!");

    // Check for saved dark mode preference
    const darkModeEnabled = localStorage.getItem("darkMode") === "enabled";

    // Function to enable dark mode
    const enableDarkMode = () => {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
        darkModeButton.innerText = "";
    };

    // Function to disable dark mode
    const disableDarkMode = () => {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
        darkModeButton.innerText = "";
    };

    // Create Dark Mode Toggle Button
    const darkModeButton = document.createElement("button");
    darkModeButton.classList.add("theme-toggle");
    
    if (darkModeEnabled) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // Toggle Dark Mode on button click
    darkModeButton.addEventListener("click", () => {
        if (document.body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Append the button to the body
    document.body.appendChild(darkModeButton);
});

const api_key_news = '86cbd4b262d74146a01a6d5636daa9d6';




async function getNews() {
  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=stocks&sortBy=publishedAt&apiKey=${api_key_news}`);
    const data = await response.json();
    const newsListElement = document.getElementById('news-list');
    newsListElement.innerHTML = '';
    data.articles.slice(0, 10).forEach((article) => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = article.url;
      link.textContent = article.title;
      link.target = '_blank';
      listItem.appendChild(link);
      newsListElement.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching news:', error);
  }
}

getMarketData();
getNews();
setInterval(getMarketData, 60000); // Update every 1 minute
const express = require('express');
const axios = require('axios');
const app = express();


