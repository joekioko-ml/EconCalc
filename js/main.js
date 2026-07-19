// js/main.js
// Application entry point and configuration

// Calculator input configurations
const CalculatorConfigs = {
  simple: [
    { id: 'p', label: 'Principal', type: 'number' },
    { id: 'r', label: 'Rate %', type: 'number' },
    { id: 't', label: 'Years', type: 'number' }
  ],

  compound: [
    { id: 'p', label: 'Principal', type: 'number' },
    { id: 'r', label: 'Rate %', type: 'number' },
    { id: 't', label: 'Years', type: 'number' }
  ],

  future: [
    { id: 'pv', label: 'Present Value', type: 'number' },
    { id: 'r', label: 'Rate %', type: 'number' },
    { id: 'n', label: 'Years', type: 'number' }
  ],

  present: [
    { id: 'fv', label: 'Future Value', type: 'number' },
    { id: 'r', label: 'Rate %', type: 'number' },
    { id: 'n', label: 'Years', type: 'number' }
  ],

  cagr: [
    { id: 'beginning', label: 'Beginning Value', type: 'number' },
    { id: 'ending', label: 'Ending Value', type: 'number' },
    { id: 'years', label: 'Years', type: 'number' }
  ],

  elasticity: [
    { id: 'qtyChange', label: '% Change in Quantity', type: 'number' },
    { id: 'priceChange', label: '% Change in Price', type: 'number' }
  ],

  breakeven: [
    { id: 'fixedCosts', label: 'Fixed Costs', type: 'number' },
    { id: 'price', label: 'Price per Unit', type: 'number' },
    { id: 'variableCost', label: 'Variable Cost per Unit', type: 'number' }
  ],

  gdpgrowth: [
    { id: 'current', label: 'Current GDP', type: 'number' },
    { id: 'previous', label: 'Previous GDP', type: 'number' }
  ],

  inflationadjusted: [
    { id: 'nominal', label: 'Nominal Value', type: 'number' },
    { id: 'inflation', label: 'Inflation Rate %', type: 'number' },
    { id: 'years', label: 'Years', type: 'number' }
  ],

  currency: null // Special handling
};

/**
 * Initialize the application
 */
function initializeApp() {
  try {
    // Initialize event managers
    EventManager.init();

    // Load and display initial data
    const history = Storage.getHistory();
    const favorites = Storage.getFavorites();

    UI.renderHistory(history);
    UI.renderFavorites(favorites);
    UI.updateDashboard(history);
    UI.updateChart(history);
    UI.changeBackground();

    console.log('✅ EconCalc initialized successfully');
    console.log(`📊 Loaded ${history.length} history items and ${favorites.length} favorites`);
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
