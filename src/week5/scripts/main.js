// --------------------------------------------------
// 📱계산기 구현하기
// --------------------------------------------------
(() => {
  const calculator = document.querySelector(".calculator");
  const calculatorKeys = calculator.querySelector(".calculator__keys");
  const calculatorDisplay = document.querySelector(".calculator__display");
  const IS_PRESSED_CLASSNAME = "is-pressed";

  const operatorKeys = [...calculatorKeys.children].filter(
    (key) => key.dataset.buttonType === "operator",
  );

  const clearKey = [...calculatorKeys.children].find(
    (key) => key.dataset.buttonType === "clear",
  );

  // button 이벤트 위임
  calculatorKeys.addEventListener("click", (e) => {
    // 기본 작동 방지
    e.preventDefault();

    // 버튼 찾기
    const button = e.target.closest("button");

    // 버튼이 없을 시, 중단
    if (!button) return;

    // 계산기를 사용할 때 일어나는 상황 / data-button-type, data-key으로 구분
    const { key, buttonType } = button.dataset;
    if (!buttonType) return;

    // 계산기 디스플레이에 나타나는 텍스트 저장
    const result = calculatorDisplay.textContent;

    // removePressedClassName 함수
    removeIsPressedClassName();

    // 1. 숫자 키를 클릭한다.
    if (buttonType === "number") {
      if (result === "0") {
        calculatorDisplay.textContent = key;
      } else {
        calculatorDisplay.textContent = result + key;
      }

      if (calculator.dataset.previousButtonType === "operator") {
        calculatorDisplay.textContent = key;
      }
    }
    // 2. 연산자 키를 클릭한다.
    if (buttonType === "operator") {
      button.classList.add(IS_PRESSED_CLASSNAME);

      calculator.dataset.firstValue = result;
      calculator.dataset.operator = key;
    }
    // 3. 소수점 키를 클릭한다.
    if (buttonType === "decimal") {
      calculatorDisplay.textContent = result + ".";
    }
    // 4. 등호(`=`) 키를 클릭한다.
    if (buttonType === "equal") {
      let firstValue = Number(calculator.dataset.firstValue);
      let operator = calculator.dataset.operator;
      let secondValue = Number(result);
      calculator.dataset.lastValue = secondValue;

      if (!isNaN(firstValue) && !isNaN(secondValue)) {
        switch (operator) {
          case "plus":
            calculatorDisplay.textContent = firstValue + secondValue;
            break;
          case "minus":
            calculatorDisplay.textContent = firstValue - secondValue;
            break;
          case "times":
            calculatorDisplay.textContent = firstValue * secondValue;
            break;
          case "divide":
            calculatorDisplay.textContent = firstValue / secondValue;
            break;
        }
        firstValue = calculatorDisplay.textContent;
      }
    }

    // 5. 클리어(`AC`) 키를 클릭한다.
    if (buttonType === "clear") {
      calculator.removeAttribute("data-frist-value");
      calculator.removeAttribute("data-operator");
      calculator.removeAttribute("data-last-value");
      calculatorDisplay.textContent = "0";
      if (clearKey.textContent.trim() === "CE") {
        clearKey.textContent = "AC";
      }
    } else {
      if (clearKey.textContent.trim() === "AC") {
        clearKey.textContent = "CE";
      }
    }

    // 계산기 data-previous-button-type 속성 업데이트
    // 이전 버튼의 타입이 operator인지 아닌지를 구별하기 위함
    calculator.dataset.previousButtonType = buttonType;
  });

  function removeIsPressedClassName() {
    for (const key of operatorKeys) {
      if (key.classList.contains(IS_PRESSED_CLASSNAME)) {
        key.classList.remove(IS_PRESSED_CLASSNAME);
        break;
      }
    }
  }
})();
