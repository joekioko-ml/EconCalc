// js/api.js
// External API calls and integrations

const APIService = {
  exchangeRateAPI: 'https://open.er-api.com/v6/latest',
  timeout: 10000, // 10 seconds

  /**
   * Convert currency using live exchange rates
   * @param {number} amount - Amount to convert
   * @param {string} fromCurrency - Source currency code (e.g., 'USD')
   * @param {string} toCurrency - Target currency code (e.g., 'EUR')
   * @returns {Promise<number>} Converted amount
   */
  async convertCurrency(amount, fromCurrency, toCurrency) {
    try {
      if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      if (!fromCurrency || !toCurrency) {
        throw new Error('Currency codes required');
      }

      const url = `${this.exchangeRateAPI}/${fromCurrency}`;
      const response = await Promise.race([
        fetch(url),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('API request timeout')),
            this.timeout
          )
        )
      ]);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.rates || !data.rates[toCurrency]) {
        throw new Error(`Currency not supported: ${toCurrency}`);
      }

      const rate = data.rates[toCurrency];
      return amount * rate;
    } catch (error) {
      console.error('Currency conversion failed:', error);
      throw new Error(`Conversion failed: ${error.message}`);
    }
  },

  /**
   * Get exchange rate between two currencies
   * @param {string} fromCurrency - Source currency code
   * @param {string} toCurrency - Target currency code
   * @returns {Promise<number>} Exchange rate
   */
  async getExchangeRate(fromCurrency, toCurrency) {
    try {
      const url = `${this.exchangeRateAPI}/${fromCurrency}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.rates[toCurrency];
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      throw error;
    }
  }
};
