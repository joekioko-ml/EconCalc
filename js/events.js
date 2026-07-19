// js/events.js
// Event listeners and handlers

const EventManager = {
  /**
   * Initialize all event listeners
   */
  init() {
    this.setupCalculatorSelection();
    this.setupCalculation();
    this.setupHistory();
    this.setupFavorites();
    this.setupExport();
    this.setupTheme();
  },

  /**
   * Setup calculator selection dropdown
   */
  setupCalculatorSelection() {
    UI.elements.formulaSelect.addEventListener('change', (e) => {
      const calculatorId = e.target.value;
      if (calculatorId) {
        const config = CalculatorConfigs[calculatorId];
        UI.renderCalculatorInputs(calculatorId, config);
      }
    });
  },

  /**
   * Setup calculation button
   */
  setupCalculation() {
    UI.elements.calculateBtn.addEventListener('click', async () => {
      try {
        const formulaId = UI.elements.formulaSelect.value;

        if (!formulaId) {
          UI.displayError('Please select a calculator');
          return;
        }

        const inputs = UI.getInputValues();

        if (!UI.validateInputs(inputs)) {
          UI.displayError('Please fill in all fields with valid values');
          return;
        }

        let result;

        // Handle special cases
        if (formulaId === 'currency') {
          result = await APIService.convertCurrency(
            inputs.amount,
            document.getElementById('from').value,
            document.getElementById('to').value
          );
        } else if (formulaId === 'standard') {
          // Standard calculator is handled differently
          UI.displayError('Standard calculator not available in new version. Coming soon!');
          return;
        } else {
          // Call calculator function
          const calculatorFunc = Calculators[formulaId];
          if (!calculatorFunc) {
            UI.displayError(`Calculator not found: ${formulaId}`);
            return;
          }
          result = calculatorFunc(...Object.values(inputs));
        }

        UI.displayResult(result, formulaId);
        const history = Storage.saveToHistory(formulaId, result);
        UI.renderHistory(history);
        UI.updateDashboard(history);
        UI.updateChart(history);
      } catch (error) {
        UI.displayError(error.message || 'Calculation failed');
      }
    });
  },

  /**
   * Setup history search and delete
   */
  setupHistory() {
    // History search
    UI.elements.historySearch.addEventListener('input', (e) => {
      const history = Storage.getHistory();
      UI.renderHistory(history, e.target.value);
    });

    // History delete
    UI.elements.historyList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const index = Number(e.target.dataset.index);
        const history = Storage.deleteHistoryItem(index);
        UI.renderHistory(history);
        UI.updateDashboard(history);
        UI.updateChart(history);
      }
    });
  },

  /**
   * Setup favorites
   */
  setupFavorites() {
    // Add favorite
    UI.elements.favoriteBtn.addEventListener('click', () => {
      const formula = UI.elements.formulaSelect.value;
      if (!formula) {
        alert('Please select a calculator first');
        return;
      }
      Storage.addFavorite(formula);
      const favorites = Storage.getFavorites();
      UI.renderFavorites(favorites);
    });

    // Load favorite
    UI.elements.favoritesList.addEventListener('click', (e) => {
      if (e.target.classList.contains('favorite-item')) {
        const formula = e.target.dataset.formula;
        UI.elements.formulaSelect.value = formula;
        UI.elements.formulaSelect.dispatchEvent(new Event('change'));
      }
    });
  },

  /**
   * Setup export functionality
   */
  setupExport() {
    UI.elements.exportBtn.addEventListener('click', () => {
      const history = Storage.getHistory();

      if (history.length === 0) {
        alert('No history to export');
        return;
      }

      // Create CSV
      let csv = 'Formula,Answer,Date\n';
      history.forEach(item => {
        csv += `"${item.formula}","${item.answer}","${item.date}"\n`;
      });

      // Download file
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'econcalc-history.csv';
      a.click();
      URL.revokeObjectURL(url);
    });
  },

  /**
   * Setup theme toggle
   */
  setupTheme() {
    UI.elements.themeBtn.addEventListener('click', () => {
      UI.toggleDarkMode();
    });
  }
};
