let favorites =
  JSON.parse(
    localStorage.getItem(
      "favorites"
    )
  ) || [];

const exportBtn =
  document.getElementById(
    "export-btn"
  );

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

const favoritesList =
  document.getElementById(
    "favorites-list"
  );

const commentBox =
  document.getElementById(
    "comment"
  );

const themeBtn =
  document.getElementById(
    "theme-btn"
  );

const favoriteBtn =
  document.getElementById(
    "favorite-btn"
  );

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

document.addEventListener(
  "DOMContentLoaded",
  () => {
    changeBackground();
    renderHistory();
    renderFavorites();
  }
);

themeBtn.addEventListener(
  "click",
  () => {
    document.body.classList.toggle(
      "dark"
    );
  }
);

select.addEventListener(
  "change",
  () => {
    inputs.innerHTML = "";

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

    if (
      select.value ===
      "simple"
    ) {
      inputs.innerHTML = `
      <input id="p"
      placeholder="Principal">

      <input id="r"
      placeholder="Rate %">

      <input id="t"
      placeholder="Years">
      `;
    }

    if (
      select.value ===
      "compound"
    ) {
      inputs.innerHTML = `
      <input id="p"
      placeholder="Principal">

      <input id="r"
      placeholder="Rate %">

      <input id="t"
      placeholder="Years">
      `;
    }

    if (
      select.value ===
      "future"
    ) {
      inputs.innerHTML = `
      <input id="pv"
      placeholder="Present Value">

      <input id="r"
      placeholder="Rate %">

      <input id="n"
      placeholder="Years">
      `;
    }

    if (
      select.value ===
      "present"
    ) {
      inputs.innerHTML = `
      <input id="fv"
      placeholder="Future Value">

      <input id="r"
      placeholder="Rate %">

      <input id="n"
      placeholder="Years">
      `;
    }

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
        <option>USD</option>
        <option>KES</option>
        <option>EUR</option>
        <option>GBP</option>
      </select>

      <button id="swap-btn">
        🔄 Swap
      </button>

      <select id="to">
        <option>KES</option>
        <option>USD</option>
        <option>EUR</option>
        <option>GBP</option>
      </select>
      `;
    }
  }
);

inputs.addEventListener(
  "click",
  (e) => {
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
      } catch {
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

    const converted =
      amount *
      data.rates[to];

    result.textContent =
      converted.toLocaleString();

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
        answer.toLocaleString();

      saveHistory(
        select.value,
        answer
      );
    }
  }
);

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
  historyList.innerHTML =
    "";

  const history =
    JSON.parse(
      localStorage.getItem(
        "history"
      )
    ) || [];

  history.forEach(
    (item, index) => {
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
      </small><br>

      <button
        class="delete-btn"
        data-index="${index}">
        🗑️ Delete
      </button>
      `;

      historyList.append(
        li
      );
    }
  );
}

historyList.addEventListener(
  "click",
  (e) => {
    if (
      !e.target.classList.contains(
        "delete-btn"
      )
    ) {
      return;
    }

    const index =
      Number(
        e.target.dataset.index
      );

    const history =
      JSON.parse(
        localStorage.getItem(
          "history"
        )
      ) || [];

    history.splice(
      index,
      1
    );

    localStorage.setItem(
      "history",
      JSON.stringify(
        history
      )
    );

    renderHistory();
  }
);

function renderFavorites() {
  favoritesList.innerHTML =
    "";

  favorites.forEach(
    (item) => {
      const li =
        document.createElement(
          "li"
        );

      li.innerHTML = `
      <button
        class="favorite-item"
        data-formula="${item}">
        ⭐ ${item}
      </button>
      `;

      favoritesList.append(
        li
      );
    }
  );
}

favoriteBtn.addEventListener(
  "click",
  () => {
    const formula =
      select.value;

    if (
      !formula ||
      favorites.includes(
        formula
      )
    ) {
      return;
    }

    favorites.push(
      formula
    );

    localStorage.setItem(
      "favorites",
      JSON.stringify(
        favorites
      )
    );

    renderFavorites();
  }
);

favoritesList.addEventListener(
  "click",
  (e) => {
    if (
      !e.target.classList.contains(
        "favorite-item"
      )
    ) {
      return;
    }

    select.value =
      e.target.dataset.formula;

    select.dispatchEvent(
      new Event(
        "change"
      )
    );
  }
);

/*-----‐---------
EXPORT FEATURE
---------*/
exportBtn.addEventListener(
  "click",
  () => {
    const history =
      JSON.parse(
        localStorage.getItem(
          "history"
        )
      ) || [];

    if (
      history.length === 0
    ) {
      alert(
        "No history to export."
      );
      return;
    }

    let csv =
      "Formula,Answer,Date\n";

    history.forEach(
      (item) => {
        csv +=
          `"${item.formula}",` +
          `"${item.answer}",` +
          `"${item.date}"\n`;
      }
    );

    const blob =
      new Blob(
        [csv],
        {
          type:
            "text/csv"
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;
    a.download =
      "econcalc-history.csv";

    a.click();

    URL.revokeObjectURL(
      url
    );
  }
);
