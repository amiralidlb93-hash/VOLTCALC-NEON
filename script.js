(() => {
  const SYMBOLS = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  const MAX_DIGITS = 12;
  const DIV_ZERO_MSG = "تقسیم بر صفر ممکن نیست";

  const state = { current: "0", previous: null, operator: null, fresh: false, error: false };

  const valueEl = document.getElementById("value");
  const exprEl = document.getElementById("expr");
  const keysEl = document.getElementById("keys");
  const calcEl = document.getElementById("calc");

  // ---------- Math helpers ----------
  function compute(a, b, op) {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? NaN : a / b;
    }
  }

  // Number -> clean string (null if not finite)
  function toText(n) {
    if (!Number.isFinite(n)) return null;
    const rounded = parseFloat(n.toPrecision(12));
    const text = String(rounded);
    return text.includes("e") ? rounded.toExponential(6) : text;
  }

  // ---------- Rendering ----------
  function render() {
    const text = state.error ? "خطا" : state.current;
    valueEl.textContent = text;
    valueEl.style.fontSize = text.length > 12 ? "22px" : text.length > 9 ? "30px" : "";
  }

  // ---------- Actions ----------
  function reset() {
    Object.assign(state, { current: "0", previous: null, operator: null, fresh: false, error: false });
    exprEl.textContent = "";
  }

  function fail() {
    Object.assign(state, { error: true, previous: null, operator: null });
    exprEl.textContent = DIV_ZERO_MSG;
  }

  function inputDigit(digit) {
    if (state.fresh) {
      state.current = digit;
      state.fresh = false;
    } else if (state.current.replace(/[-.]/g, "").length < MAX_DIGITS) {
      state.current = state.current === "0" ? digit : state.current + digit;
    }
  }

  function inputDot() {
    if (state.fresh) {
      state.current = "0.";
      state.fresh = false;
    } else if (!state.current.includes(".")) {
      state.current += ".";
    }
  }

  function backspace() {
    if (state.fresh) return;
    const c = state.current;
    const isSingle = c.length === 1 || (c.length === 2 && c[0] === "-");
    state.current = isSingle ? "0" : c.slice(0, -1);
  }

  function toggleSign() {
    if (state.current === "0") return;
    state.current = state.current.startsWith("-") ? state.current.slice(1) : "-" + state.current;
  }

  function percent() {
    state.current = toText(parseFloat(state.current) / 100);
    state.fresh = true;
  }

  function chooseOperator(op) {
    // Chain: 2 + 3 + ... computes 2 + 3 first
    if (state.operator && !state.fresh) {
      const result = toText(compute(state.previous, parseFloat(state.current), state.operator));
      if (result === null) return fail();
      state.current = result;
    }
    state.previous = parseFloat(state.current);
    state.operator = op;
    state.fresh = true;
    exprEl.textContent = `${toText(state.previous)} ${SYMBOLS[op]}`;
  }

  function equals() {
    if (!state.operator) return;
    const result = toText(compute(state.previous, parseFloat(state.current), state.operator));
    if (result === null) return fail();
    exprEl.textContent = `${toText(state.previous)} ${SYMBOLS[state.operator]} ${state.current} =`;
    Object.assign(state, { current: result, previous: null, operator: null, fresh: true });
  }

  function press(key) {
    if (state.error) {
      reset();
      if (key === "AC" || key === "⌫") return render();
    }

    if (/^\d$/.test(key)) inputDigit(key);
    else if (key === ".") inputDot();
    else if (key === "AC") reset();
    else if (key === "⌫") backspace();
    else if (key === "±") toggleSign();
    else if (key === "%") percent();
    else if (key === "=") equals();
    else chooseOperator(key);

    render();
  }

  // ---------- Mouse / touch ----------
  keysEl.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) press(button.dataset.k);
  });

  // ---------- Keyboard ----------
  const buttons = new Map([...keysEl.querySelectorAll("button")].map((b) => [b.dataset.k, b]));
  const KEY_ALIASES = { Enter: "=", Backspace: "⌫", Escape: "AC", Delete: "AC", ",": "." };

  window.addEventListener("keydown", (e) => {
    const key = KEY_ALIASES[e.key] ?? e.key;
    const button = buttons.get(key);
    if (!button) return;

    e.preventDefault();
    press(key);
    button.classList.add("hit");
    setTimeout(() => button.classList.remove("hit"), 110);
  });

  // ---------- 3D tilt ----------
  window.addEventListener("pointermove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    calcEl.style.setProperty("--ry", `${x * 14}deg`);
    calcEl.style.setProperty("--rx", `${-y * 12}deg`);
  });

  render();
})();
