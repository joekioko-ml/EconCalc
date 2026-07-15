const select =
  document.getElementById(
    "formula-select"
  );

const inputs =
  document.getElementById(
    "inputs"
  );

const result =
  document.getElementById(
    "result"
  );

const calculateBtn =
  document.getElementById(
    "calculate-btn"
  );

const historyList =
  document.getElementById(
    "history-list"
  );

const commentBox =
  document.getElementById(
    "comment"
  );

const themeBtn =
  document.getElementById(
    "theme-btn"
  );

/* --------------------
   BACKGROUNDS
-------------------- */

const backgrounds = [
  "images/bg1.jpg",
  "images/bg2.jpg",
  "images/bg3.jpg",
  "images/bg4.jpg"
];

function changeBackground() {
  const random =
    Math.floor(
      Math.random() *
      backgrounds.length
    );

  document.body.style.backgroundImage =
    `url(${backgrounds[random]})`;
}

/* --------------------
   STARTUP
-------------------- */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    changeBackground();
    renderHistory();
  }
);

/* --------------------
   DARK MODE
-------------------- */

themeBtn.addEventListener(
  "click",
  () => {
    document.body.classList.toggle(
      "dark"
    );
  }
);

/* --------------------
   DYNAMIC FORMS
-------------------- */

select.addEventListener(
  "change",
  () => {
    inputs.innerHTML = "";

    /* Standard Calculator */

    if (
      select.value ===
      "standard"
    ) {
      inputs.innerHTML = `
      <div class="standard-calc">

        <input
          id="display"
          readonly>

        <div class="buttons">

          <button>C</button>
          <button>(</button>
          <button>)</button>
          <button>/</button>

          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>*</button>

          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>-</button>

          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>+</button>

          <button>0</button>
          <button>.</button>
          <button>%</button>
          <button>=</button>

        </div>

      </div>
      `;
    }

    /* Simple Interest */

    if (
      select.value ===
      "simple"
    ) {
      inputs.innerHTML = `
      <input
        id="p"
        placeholder="Principal (KES)">

      <input
        id="r"
        placeholder="Rate (%)">

      <input
        id="t"
        placeholder="Time (Years)">
      `;
    }

    /* Compound Interest */

    if (
      select.value ===
      "compound"
    ) {
      inputs.innerHTML = `
      <input
        id="p"
        placeholder="Principal (KES)">

      <input
        id="r"
        placeholder="Rate (%)">

      <input
        id="t"
        placeholder="Years">
      `;
    }

    /* Future Value */

    if (
      select.value ===
      "future"
    ) {
      inputs.innerHTML = `
      <input
        id="pv"
        placeholder="Present Value">

      <input
        id="r"
        placeholder="Rate (%)">

      <input
        id="n"
        placeholder="Years">
      `;
    }

    /* Present Value */

    if (
      select.value ===
      "present"
    ) {
      inputs.innerHTML = `
      <input
        id="fv"
        placeholder="Future Value">

      <input
        id="r"
        placeholder="Rate (%)">

      <input
        id="n"
        placeholder="Years">
      `;
    }

    /* Currency Converter */

    if (
      select.value ===
      "currency"
    ) {
      inputs.innerHTML = `
      <input
        id="amount"
        type="number"
        placeholder="Amount">

      <select id="from">
        <option value="USD">
          USD
        </option>

        <option value="KES">
          KES
        </option>

        <option value="EUR">
          EUR
        </option>

        <option value="GBP">
          GBP
        </option>

        <option value="JPY">
          JPY
        </option>

        <option value="CAD">
          CAD
        </option>

        <option value="AUD">
          AUD
        </option>
      </select>

      <button id="swap-btn">
        🔄 Swap
      </button>

      <select id="to">
        <option value="KES">
          KES
        </option>

        <option value="USD">
          USD
        </option>

        <option value="EUR">
          EUR
        </option>

        <option value="GBP">
          GBP
        </option>

        <option value="JPY">
          JPY
        </option>

        <option value="CAD">
          CAD
        </option>

        <option value="AUD">
          AUD
        </option>
      </select>
      `;
    }
  }
);

/* --------------------
   INPUT EVENTS
-------------------- */

inputs.addEventListener(
  "click",
  (e) => {
    /* Swap currencies */

    if (
      e.target.id ===
      "swap-btn"
    ) {
      const from =
        document.getElementById(
          "from"
        );

      const to =
        document.getElementById(
          "to"
        );

      const temp =
        from.value;

      from.value =
        to.value;

      to.value =
        temp;

      return;
    }

    /* Calculator buttons */

    if (
      !e.target.matches(
        ".buttons button"
      )
    ) {
      return;
    }

    const display =
      document.getElementById(
        "display"
      );

    if (!display) return;

    const value =
      e.target.textContent;

    if (value === "C") {
      display.value = "";
      return;
    }

    if (value === "=") {
      try {
        display.value =
          eval(
            display.value
          );
      }
      catch {
        display.value =
          "Error";
      }

      return;
    }

    if (value === "%") {
      display.value =
        Number(
          display.value
        ) / 100;

      return;
    }

    display.value += value;
  }
);

/* --------------------
   CURRENCY API
-------------------- */

async function convertCurrency() {
  const amount =
    Number(
      document.getElementById(
        "amount"
      ).value
    );

  const from =
    document.getElementById(
      "from"
    ).value;

  const to =
    document.getElementById(
      "to"
    ).value;

  try {
    result.textContent =
      "Loading...";

    const response =
      await fetch(
        `https://open.er-api.com/v6/latest/${from}`
      );

    const data =
      await response.json();

    const rate =
      data.rates[to];

    if (!rate) {
      result.textContent =
        "Currency not found";
      return;
    }

    const converted =
      amount * rate;

    result.textContent =
      converted.toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      );

    saveHistory(
      `${from} → ${to}`,
      converted
    );
  }
  catch {
    result.textContent =
      "Network Error";
  }
}

/* --------------------
   CALCULATIONS
-------------------- */

calculateBtn.addEventListener(
  "click",
  () => {
    let answer;

    if (
      select.value ===
      "currency"
    ) {
      convertCurrency();
      return;
    }

    if (
      select.value ===
      "simple"
    ) {
      const p =
        Number(
          document.getElementById(
            "p"
          ).value
        );

      const r =
        Number(
          document.getElementById(
            "r"
          ).value
        );

      const t =
        Number(
          document.getElementById(
            "t"
          ).value
        );

      answer =
        (p * r * t) / 100;
    }

    if (
      select.value ===
      "compound"
    ) {
      const p =
        Number(
          document.getElementById(
            "p"
          ).value
        );

      const r =
        Number(
          document.getElementById(
            "r"
          ).value
        );

      const t =
        Number(
          document.getElementById(
            "t"
          ).value
        );

      answer =
        p *
        Math.pow(
          1 + r / 100,
          t
        );
    }

    if (
      select.value ===
      "future"
    ) {
      const pv =
        Number(
          document.getElementById(
            "pv"
          ).value
        );

      const r =
        Number(
          document.getElementById(
            "r"
          ).value
        );

      const n =
        Number(
          document.getElementById(
            "n"
          ).value
        );

      answer =
        pv *
        Math.pow(
          1 + r / 100,
          n
        );
    }

    if (
      select.value ===
      "present"
    ) {
      const fv =
        Number(
          document.getElementById(
            "fv"
          ).value
        );

      const r =
        Number(
          document.getElementById(
            "r"
          ).value
        );

      const n =
        Number(
          document.getElementById(
            "n"
          ).value
        );

      answer =
        fv /
        Math.pow(
          1 + r / 100,
          n
        );
    }

    if (
      answer !== undefined
    ) {
      result.textContent =
        answer.toLocaleString(
          undefined,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }
        );

      saveHistory(
        select.value,
        answer
      );
    }
  }
);

/* --------------------
   HISTORY
-------------------- */

function saveHistory(
  formula,
  answer
) {
  const history =
    JSON.parse(
      localStorage.getItem(
        "history"
      )
    ) || [];

  history.push({
    formula,
    answer,
    comment:
      commentBox.value,
    date:
      new Date()
        .toLocaleString()
  });

  localStorage.setItem(
    "history",
    JSON.stringify(
      history
    )
  );

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";

  const history =
    JSON.parse(
      localStorage.getItem(
        "history"
      )
    ) || [];

  history.forEach(
    (item) => {
      const li =
        document.createElement(
          "li"
        );

      li.innerHTML = `
        <strong>
          ${item.formula}
        </strong><br>

        ${Number(
          item.answer
        ).toLocaleString()}<br>

        <small>
          ${item.date}
        </small>
      `;

      historyList.append(
        li
      );
    }
  );
}
