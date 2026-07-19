// js/storage.js
// Centralized localStorage management

const Storage = {
  // Get data from localStorage
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error reading from storage: ${key}`, error);
      return defaultValue;
    }
  },

  // Save data to localStorage
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to storage: ${key}`, error);
      return false;
    }
  },

  // Remove data from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from storage: ${key}`, error);
      return false;
    }
  },

  // Get history
  getHistory() {
    return this.get('history', []);
  },

  // Save calculation to history
  saveToHistory(formula, answer) {
    const history = this.getHistory();
    history.push({
      formula,
      answer,
      date: new Date().toLocaleString()
    });
    this.set('history', history);
    return history;
  },

  // Delete history item
  deleteHistoryItem(index) {
    const history = this.getHistory();
    history.splice(index, 1);
    this.set('history', history);
    return history;
  },

  // Clear all history
  clearHistory() {
    return this.remove('history');
  },

  // Get favorites
  getFavorites() {
    return this.get('favorites', []);
  },

  // Add favorite
  addFavorite(formula) {
    const favorites = this.getFavorites();
    if (!favorites.includes(formula)) {
      favorites.push(formula);
      this.set('favorites', favorites);
    }
    return favorites;
  },

  // Remove favorite
  removeFavorite(formula) {
    const favorites = this.getFavorites();
    const filtered = favorites.filter(f => f !== formula);
    this.set('favorites', filtered);
    return filtered;
  },

  // Clear all favorites
  clearFavorites() {
    return this.remove('favorites');
  }
};
