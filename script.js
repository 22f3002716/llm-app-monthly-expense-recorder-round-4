document.addEventListener('DOMContentLoaded', () => {
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseDescriptionInput = document.getElementById('expense-description');
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const expenseList = document.getElementById('expense-list');
    const currentMonthTotalSpan = document.getElementById('current-month-total');
    const currentMonthDisplay = document.getElementById('current-month-display');
    const clearDataBtn = document.getElementById('clear-data-btn');
    const trendChart = document.getElementById('trend-chart');

    // Default trend data as per attached file
    const defaultTrendData = [
        { "month": "2025-08", "total": 1500},
        { "month": "2025-09", "total": 1250},
        { "month": "2025-10", "total": 1700}
    ];

    const currentMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const localStorageKey = `expenses_${currentMonth.replace(/\s/g, '_')}`; // e.g., expenses_October_2023
    const trendDataLocalStorageKey = 'previous_totals';

    let expenses = [];
    let trendData = [];

    // Function to get month name from YYYY-MM format
    const getMonthName = (dateString) => {
        const parts = dateString.split('-');
        const year = parseInt(parts[0]);
        const monthIndex = parseInt(parts[1]) - 1; // Month is 0-indexed in Date object
        const date = new Date(year, monthIndex);
        return date.toLocaleString('en-US', { month: 'short' });
    };

    // Load data from LocalStorage
    const loadData = () => {
        const storedExpenses = localStorage.getItem(localStorageKey);
        if (storedExpenses) {
            expenses = JSON.parse(storedExpenses);
        } else {
            expenses = [];
        }

        const storedTrendData = localStorage.getItem(trendDataLocalStorageKey);
        if (storedTrendData) {
            trendData = JSON.parse(storedTrendData);
        } else {
            trendData = defaultTrendData;
            // Optionally, save default trend data to LS if it's not there
            // localStorage.setItem(trendDataLocalStorageKey, JSON.stringify(defaultTrendData));
        }
    };

    // Save data to LocalStorage
    const saveExpenses = () => {
        localStorage.setItem(localStorageKey, JSON.stringify(expenses));
    };

    // Render current month expenses
    const renderExpenses = () => {
        expenseList.innerHTML = '';
        let total = 0;
        expenses.forEach(expense => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${expense.description}</span>
                <span>$${expense.amount.toFixed(2)}</span>
            `;
            expenseList.appendChild(listItem);
            total += expense.amount;
        });
        currentMonthTotalSpan.textContent = total.toFixed(2);
        currentMonthDisplay.textContent = currentMonth;
    };

    // Render trend chart
    const renderTrendChart = () => {
        trendChart.innerHTML = ''; // Clear previous chart
        if (trendData.length === 0) {
            trendChart.textContent = 'No trend data available.';
            return;
        }

        // Find the maximum total to scale the bars
        const maxTotal = Math.max(...trendData.map(item => item.total));
        const chartHeight = 150; // Max height for a bar in pixels

        trendData.forEach(item => {
            const barContainer = document.createElement('div');
            barContainer.classList.add('trend-bar-container');

            const bar = document.createElement('div');
            bar.classList.add('trend-bar');
            // Calculate height proportional to maxTotal, ensuring a minimum height for visibility
            const barHeight = Math.max(10, (item.total / maxTotal) * chartHeight); // Minimum height of 10px
            bar.style.height = `${barHeight}px`;

            const valueSpan = document.createElement('span');
            valueSpan.classList.add('trend-bar-value');
            valueSpan.textContent = `$${item.total}`;
            bar.appendChild(valueSpan);

            const label = document.createElement('div');
            label.classList.add('trend-bar-label');
            label.textContent = getMonthName(item.month); // "Aug", "Sep", "Oct"
            
            barContainer.appendChild(bar);
            barContainer.appendChild(label);
            trendChart.appendChild(barContainer);
        });
    };

    // Add expense handler
    addExpenseBtn.addEventListener('click', () => {
        const amount = parseFloat(expenseAmountInput.value);
        const description = expenseDescriptionInput.value.trim();

        if (isNaN(amount) || amount <= 0 || description === '') {
            alert('Please enter a valid amount and description.');
            return;
        }

        expenses.push({ amount, description });
        saveExpenses();
        renderExpenses();

        expenseAmountInput.value = '';
        expenseDescriptionInput.value = '';
    });

    // Clear data handler
    clearDataBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all expenses for the current month? This action cannot be undone.')) {
            expenses = [];
            saveExpenses(); // Clear current month expenses from LocalStorage
            renderExpenses(); // Update display
            alert('All current month expenses have been deleted.');
        }
    });

    // Initial load and render
    loadData();
    renderExpenses();
    renderTrendChart();
});
