// js/ui.js
// DOM manipulation and UI rendering

const UI = {
  // Cache frequently used DOM elements
  elements: {
    formulaSelect: document.getElementById('formula-select'),
    inputs: document.getElementById('inputs'),
    result: document.getElementById('result'),
    calculateBtn: document.getElementById('calculate-btn'),
    historyList: document.getElementById('history-list'),
    historySearch: document.getElementById('history-search'),
    favoritesList: document.getElementById('favorites-list'),
    favoriteBtn: document.getElementById('favorite-btn'),
    exportBtn: document.getElementById('export-btn'),
    themeBtn: document.getElementById('theme-btn'),
    totalCalcs: document.getElementById('total-calcs'),
    topFormula: document.getElementById('top-formula'),
    largestResult: document.getElementById('largest-result'),
    averageResult: document.getElementById('average-result'),
    formulaChart: document.getElementById('formula-chart')
  },

  /**
   * Render calculator input fields
   * @param {string} calculatorId - ID of the calculator
   * @param {Array} inputConfig - Input field configuration
   */
  renderCalculatorInputs(calculatorId, inputConfig) {
    this.elements.inputs.innerHTML = '';

    if (!inputConfig || inputConfig.length === 0) {
      return;
    }

    inputConfig.forEach(field => {
      const input = document.createElement('input');
      input.id = field.id;
      input.type = field.type || 'number';
      input.placeholder = field.label;
      this.elements.inputs.appendChild(input);
    });
  },

  /**
   * Display calculation result
   * @param {number} value - Result value
   * @param {string} formula - Formula name
   */
  displayResult(value, formula) {
    const formatted = Number(value).toLocaleString();
    this.elements.result.textContent = formatted;
    this.elements.result.style.color = '';
  },

  /**
   * Display error message
   * @param {string} message - Error message
   */
  displayError(message) {
    this.elements.result.textContent = `Error: ${message}`;
    this.elements.result.style.color = '#ff6b6b';
    console.error(message);
  },

  /**
   * Get input values from form
   * @returns {Object} Object with input IDs as keys and values
   */
  getInputValues() {
    const inputs = this.elements.inputs.querySelectorAll('input, select');
    const values = {};
    inputs.forEach(input => {
      values[input.id] = isNaN(input.value) ? input.value : Number(input.value);
    });
    return values;
  },

  /**
   * Validate that all inputs are filled and valid
   * @param {Object} inputs - Input values
   * @returns {boolean} True if valid
   */
  validateInputs(inputs) {
    const values = Object.values(inputs);
    if (values.length === 0) {
      return false;
    }
    return values.every(v => v !== '' && v !== null && !isNaN(v));
  },

  /**
   * Render calculation history
   * @param {Array} history - History array
   * @param {string} searchTerm - Optional search filter
   */
  renderHistory(history, searchTerm = '') {
    this.elements.historyList.innerHTML = '';

    const filtered = history.filter(item =>
      item.formula.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 0) {
      const li = document.createElement('li');
      li.innerHTML = '<em>No calculations yet</em>';
      this.elements.historyList.appendChild(li);
      return;
    }

    filtered.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${item.formula}</strong><br>
        ${Number(item.answer).toLocaleString()}<br>
        <small>${item.date}</small><br>
        <button class="delete-btn" data-index="${index}">🗑️ Delete</button>
      `;
      this.elements.historyList.appendChild(li);
    });
  },

  /**
   * Render favorites list
   * @param {Array} favorites - Favorites array
   */
  renderFavorites(favorites) {
    this.elements.favoritesList.innerHTML = '';

    if (favorites.length === 0) {
      const li = document.createElement('li');
      li.innerHTML = '<em>No favorites yet</em>';
      this.elements.favoritesList.appendChild(li);
      return;
    }

    favorites.forEach(formula => {
      const li = document.createElement('li');
      li.innerHTML = `
        <button class="favorite-item" data-formula="${formula}">
          ⭐ ${formula}
        </button>
      `;
      this.elements.favoritesList.appendChild(li);
    });
  },

  /**
   * Update dashboard statistics
   * @param {Array} history - History array
   */
  updateDashboard(history) {
    this.elements.totalCalcs.textContent = history.length;

    if (history.length === 0) {
      this.elements.topFormula.textContent = 'None';
      this.elements.largestResult.textContent = '0';
      this.elements.averageResult.textContent = '0';
      return;
    }

    // Calculate statistics
    const answers = history.map(h => Number(h.answer));
    const largest = Math.max(...answers);
    const average = answers.reduce((a, b) => a + b, 0) / answers.length;

    this.elements.largestResult.textContent = largest.toLocaleString();
    this.elements.averageResult.textContent = average.toFixed(2);

    // Find most used formula
    const counts = {};
    history.forEach(h => {
      counts[h.formula] = (counts[h.formula] || 0) + 1;
    });

    const topFormula = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
    this.elements.topFormula.textContent = topFormula;
  },

  /**
   * Update chart with formula usage statistics
   * @param {Array} history - History array
   */
  updateChart(history) {
    const counts = {};
    history.forEach(item => {
      counts[item.formula] = (counts[item.formula] || 0) + 1;
    });

    const labels = Object.keys(counts);
    const data = Object.values(counts);

    // Destroy existing chart if it exists
    if (window.formulaChart) {
      window.formulaChart.destroy();
    }

    // Create new chart
    if (labels.length > 0) {
      const ctx = this.elements.formulaChart.getContext('2d');
      window.formulaChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Times Used',
              data,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderColor: 'rgba(255, 255, 255, 0.8)',
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: 'white'
              }
            },
            x: {
              ticks: {
                color: 'white'
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'white'
              }
            }
          }
        }
      });
    }
  },

  /**
   * Toggle dark mode
   */
  toggleDarkMode() {
    document.body.classList.toggle('dark');
  },

  /**
   * Change random background image
   */
  changeBackground() {
    const backgrounds = [
      'images/bg1.jpg',
      'images/bg2.jpg',
      'images/bg3.jpg',
      'images/bg4.jpg'
    ];
    const random = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url(${backgrounds[random]})`;
  }
};
