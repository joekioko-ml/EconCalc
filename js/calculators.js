// js/calculators.js
// All calculation functions

const Calculators = {
  // Simple Interest: I = (P × R × T) / 100
  simple(p, r, t) {
    if (p <= 0 || r < 0 || t <= 0) {
      throw new Error('Invalid inputs: Principal and Years must be positive');
    }
    return (p * r * t) / 100;
  },

  // Compound Interest: A = P × (1 + R/100)^T
  compound(p, r, t) {
    if (p <= 0 || r < 0 || t <= 0) {
      throw new Error('Invalid inputs: Principal and Years must be positive');
    }
    return p * Math.pow(1 + r / 100, t);
  },

  // Future Value: FV = PV × (1 + R/100)^N
  future(pv, r, n) {
    if (pv <= 0 || r < 0 || n <= 0) {
      throw new Error('Invalid inputs: Present Value and Years must be positive');
    }
    return pv * Math.pow(1 + r / 100, n);
  },

  // Present Value: PV = FV / (1 + R/100)^N
  present(fv, r, n) {
    if (fv <= 0 || r < 0 || n <= 0) {
      throw new Error('Invalid inputs: Future Value and Years must be positive');
    }
    return fv / Math.pow(1 + r / 100, n);
  },

  // CAGR (Compound Annual Growth Rate): CAGR = (Ending/Beginning)^(1/Years) - 1
  cagr(beginningValue, endingValue, years) {
    if (beginningValue <= 0 || endingValue <= 0 || years <= 0) {
      throw new Error('Invalid inputs: All values must be positive');
    }
    return (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
  },

  // Elasticity: E = (% Change in Quantity) / (% Change in Price)
  elasticity(percentChangeQty, percentChangePrice) {
    if (percentChangePrice === 0) {
      throw new Error('Price change cannot be zero');
    }
    return percentChangeQty / percentChangePrice;
  },

  // NPV (Net Present Value): NPV = -Initial Investment + Σ(CF / (1 + r)^t)
  npv(initialInvestment, discountRate, cashFlows) {
    if (discountRate < 0 || discountRate > 100) {
      throw new Error('Discount rate must be between 0 and 100');
    }
    let npv = -initialInvestment;
    cashFlows.forEach((cf, year) => {
      npv += cf / Math.pow(1 + discountRate / 100, year + 1);
    });
    return npv;
  },

  // Inflation Adjusted Value: Real Value = Nominal / (1 + Inflation Rate)^Years
  inflationAdjusted(nominalValue, inflationRate, years) {
    if (nominalValue <= 0 || inflationRate < 0 || years <= 0) {
      throw new Error('Invalid inputs');
    }
    return nominalValue / Math.pow(1 + inflationRate / 100, years);
  },

  // Break-even Quantity: Q = Fixed Costs / (Price - Variable Cost)
  breakEven(fixedCosts, price, variableCost) {
    if (price <= variableCost) {
      throw new Error('Price must be greater than variable cost');
    }
    return fixedCosts / (price - variableCost);
  },

  // Multiplier Effect: Multiplier = 1 / (1 - MPC)
  multiplier(marginalpropensityToConsume) {
    if (marginalpropensityToConsume <= 0 || marginalpropensityToConsume >= 1) {
      throw new Error('MPC must be between 0 and 1');
    }
    return 1 / (1 - marginalpropensityToConsume);
  },

  // GDP Growth Rate: Growth % = ((Current GDP - Previous GDP) / Previous GDP) × 100
  gdpGrowth(currentGDP, previousGDP) {
    if (previousGDP <= 0) {
      throw new Error('Previous GDP must be positive');
    }
    return ((currentGDP - previousGDP) / previousGDP) * 100;
  }
};
