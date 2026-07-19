# EconCalc 📈

> A modern, interactive web application for financial and economic calculations. Perfect for students, professionals, and anyone who needs quick financial analysis tools.

## 🎯 What is EconCalc?

EconCalc is an **all-in-one calculator** for economic and financial calculations. It offers multiple specialized calculators for different financial scenarios, from basic arithmetic to complex interest calculations and currency conversion. Everything runs directly in your browser with a beautiful, responsive interface that works on desktop and mobile devices.

## ✨ Features

### Calculators Included

1. **Standard Calculator** - Basic arithmetic operations (addition, subtraction, multiplication, division, percentages)
2. **Simple Interest** - Calculate interest earned on principal amount with formula: `Interest = (Principal × Rate × Time) / 100`
3. **Compound Interest** - Calculate compound returns with formula: `Amount = Principal × (1 + Rate/100)^Time`
4. **Future Value** - Project what your money will be worth in the future at a given interest rate
5. **Present Value** - Calculate today's value of future cash flows (inverse of future value)
6. **Currency Converter** - Convert between USD, EUR, GBP, and KES using live exchange rates

### Built-in Features

- 📊 **Dashboard** - View statistics about your calculations (total calculations, favorite formula, largest result, average result)
- 📈 **Visual Charts** - See usage patterns with a bar chart showing which calculators you use most
- ⭐ **Favorites** - Save your most-used calculators for quick access
- 📝 **History** - All your calculations are automatically saved with timestamps
- 🔍 **History Search** - Find past calculations by formula type
- 💾 **Export** - Download your calculation history as a CSV file
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 🎨 **Beautiful UI** - Modern glass morphism design with random background images

## 🚀 Quick Start

### No Installation Needed!

EconCalc is a **web-based application**. To use it:

1. **Clone the repository**
   ```bash
   git clone https://github.com/joekioko-ml/EconCalc.git
   cd EconCalc
   ```

2. **Open in your browser**
   - Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
   - Or serve locally with Python:
     ```bash
     python -m http.server 8000
     ```
   - Then visit `http://localhost:8000` in your browser

3. **Start calculating!**
   - Select a calculator from the dropdown menu
   - Enter your values
   - Click "Calculate"
   - Your results automatically appear in the Result section

## 📚 How to Use Each Calculator

### Standard Calculator
- Click on number buttons to enter values
- Use operators (+, -, *, /, %) for operations
- Press `=` to get the result
- Press `C` to clear

**Example:** To calculate 45 + 25, click `4` → `5` → `+` → `2` → `5` → `=` → Result: `70`

### Simple Interest
**Formula:** Interest = (Principal × Rate × Time) ÷ 100

- **Principal:** The initial amount of money
- **Rate:** Annual interest rate (in %)
- **Years:** How many years the money will be invested

**Example:** If you invest $1000 at 5% interest for 3 years:
- Principal: 1000, Rate: 5, Years: 3 → Result: $150 interest earned

### Compound Interest
**Formula:** Amount = Principal × (1 + Rate/100)^Time

- Similar inputs to Simple Interest, but the interest is calculated on accumulated interest
- Produces larger results than simple interest over time

**Example:** $1000 at 5% compounded for 3 years → Result: $1157.63 (total amount)

### Future Value
**Formula:** Future Value = Present Value × (1 + Rate/100)^Time

- Calculates what a current amount will be worth in the future
- Useful for retirement planning and investment projections

### Present Value
**Formula:** Present Value = Future Value ÷ (1 + Rate/100)^Time

- Calculates today's value of a future amount
- Answers the question: "How much do I need to invest now?"

### Currency Converter
- Select "from" currency (source)
- Enter the amount to convert
- Select "to" currency (destination)
- Click the 🔄 Swap button to quickly reverse currencies
- Live exchange rates are fetched automatically

## 💾 Data Storage

All your data stays **on your device** using browser storage (localStorage):
- Calculation history is saved automatically
- Favorites are remembered between sessions
- Comments and notes are stored locally
- **Your data is never sent to any server**

## 🏗️ Project Structure

```
EconCalc/
├── index.html          # Main HTML structure - the page layout
├── script.js           # All calculations and interactive features
├── style.css           # Styling and responsive design
├── README.md           # This file!
└── images/             # Background images (optional)
```

### How It Works (For Beginners)

1. **index.html** - Defines what you see on the page
   - Creates the calculator interface with buttons and input fields
   - Loads Chart.js library for visualizations
   - Links to style.css and script.js

2. **script.js** - The "brain" of the application
   - Listens for user interactions (clicks, typing)
   - Performs calculations using JavaScript math functions
   - Manages data in localStorage for persistence
   - Updates the dashboard and charts
   - Handles currency conversion via API

3. **style.css** - Makes everything look beautiful
   - Glass morphism design effect
   - Responsive layout (works on mobile, tablet, desktop)
   - Dark mode styles
   - Button and input styling

## 🔄 Key JavaScript Concepts Used

If you're learning to code, here are the main concepts used in this project:

- **Event Listeners** - Responds to user actions like clicks and input
- **Functions** - Reusable blocks of code for calculations and updates
- **localStorage API** - Saves data in the browser
- **Async/Await** - Fetches live currency rates from an API
- **Array Methods** - Processes calculation history (filter, map, reduce)
- **DOM Manipulation** - Updates the page dynamically without refreshing
- **Chart.js Library** - Creates beautiful data visualizations

## 🌐 Live Features Requiring Internet

- **Currency Converter** - Uses the [ER-API](https://open.er-api.com/) for live exchange rates
- All other calculators work offline

## 🎨 Customization

### Change Currencies
In `script.js`, find the currency dropdown options and modify:
```javascript
<option>USD</option>
<option>KES</option>
<option>EUR</option>
<option>GBP</option>
```

### Add More Calculators
1. Add a new option in the `<select>` in `index.html`
2. Add the input fields in `script.js` in the dropdown change handler
3. Add the calculation logic in the calculate button handler

### Change Theme Colors
Edit `style.css` to modify:
- Glass effect opacity and blur
- Color schemes
- Button styles
- Layout breakpoints

## 🔧 Requirements

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (only for currency conversion)
- No server or backend needed!

## 📊 Technologies Used

- **HTML5** - Page structure
- **CSS3** - Styling and responsive design
- **JavaScript (Vanilla)** - Pure JavaScript, no frameworks
- **Chart.js** - Data visualization library
- **ER-API** - Free currency exchange API

## 🤝 Contributing

Have ideas to improve EconCalc? Contributions are welcome!

### Ways to contribute:
- Add new calculators (mortgage, loan amortization, inflation adjustment, etc.)
- Fix bugs or improve calculations
- Improve UI/UX design
- Add more currency options
- Improve documentation
- Add multi-language support

To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add YourFeature'`)
5. Push to your branch (`git push origin feature/YourFeature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

The MIT License means you can use, modify, and distribute this code freely, as long as you include the license notice.

## 🆘 Support & Issues

- Found a bug? [Open an issue](https://github.com/joekioko-ml/EconCalc/issues)
- Have questions? Feel free to ask in the issues section
- Want to suggest a feature? Drop it in the discussions

## 📖 Learning Resources

If you want to understand the code better:

- **JavaScript Basics** - [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- **DOM Manipulation** - [JavaScript.info](https://javascript.info/dom-manipulation)
- **localStorage** - [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- **Fetch API** - [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- **Chart.js Documentation** - [Chart.js Docs](https://www.chartjs.org/)

## 🎓 Use Cases

Perfect for:
- Students learning about financial mathematics
- Professionals making quick financial calculations
- Personal finance management
- Investment analysis
- Learning web development fundamentals
- Understanding financial formulas

## 🚀 Future Enhancements

Potential features for future versions:
- Loan calculator with amortization schedule
- Investment portfolio tracker
- Inflation calculator
- Savings goal planner
- Multi-currency comparison
- Downloadable as PWA (Progressive Web App)
- Multiple language support
- Calculation formula explanations

---

**Made with ❤️ for financial education and accessibility**

[⬆ Back to top](#econcalc-)
