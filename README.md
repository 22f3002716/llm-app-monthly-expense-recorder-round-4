# Expense Recorder with Trend Analysis

This is a simple single-page web application designed to help you record your daily expenses and visualize spending trends over the last three months. It stores your expense data locally in your browser's LocalStorage.

## Features

*   **Record Expenses**: Easily add new expenses with an amount and a description for the current month.
*   **Current Month's Total**: Displays a running total of all expenses for the current month.
*   **Trend Analysis**: Visualizes your total expenses for the last three months (August, September, October) using a simple bar chart. This data is loaded from LocalStorage or falls back to a default dataset if no historical data is found.
*   **Delete All Current Month Expenses**: A dedicated button to clear all recorded expenses for the current month from LocalStorage.
*   **Persistent Data**: All current month's expenses are saved in LocalStorage, so they persist even if you close and reopen the browser.

## How to Use

1.  **Add an Expense**: Enter the amount and a brief description in the respective input fields and click "Add Expense".
2.  **View Current Expenses**: The expenses you add will appear in a list, and the total for the current month will update automatically.
3.  **Monitor Trends**: The "Monthly Expense Trend" section will display a bar chart showing your spending for the last three months. The height of each bar is proportional to the total expense for that month.
4.  **Clear Current Month's Data**: If you wish to remove all expenses recorded for the current month, click the "Delete All Current Month Expenses" button. A confirmation prompt will appear before clearing the data.

## How to Run

1.  **Save the files**: Save `index.html`, `style.css`, and `script.js` into the same folder.
2.  **Open `index.html`**: Simply open the `index.html` file in your web browser. There's no need for a web server.

## Technologies Used

*   HTML5
*   CSS3
*   JavaScript (ES6+)
*   LocalStorage API

## LocalStorage Usage

*   **Current Expenses**: Stored under a key like `expenses_Month_Year` (e.g., `expenses_October_2023`).
*   **Trend Data**: Historical trend data for the last three months is stored under the key `previous_totals`. If this key is empty, the application will use the default trend data provided.