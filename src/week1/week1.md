# 1주차 과제 - 변수, 상수 및 함수 작성

이번 과제는 변수/상수 선언 및 다양한 함수 구현을 통해 JS 기본 문법을 실습하는 것이었습니다.

---

## 목차

- [변수, 상수 작성](#변수,-상수-작성)
- [함수 구현](#함수-구현)
  - [1. 인사말 메시지](#1-인사말-메시지)
  - [2. 원가 계산](#2-원가-계산)
  - [3. 주류 판매 가능 여부](#3-주류-판매-가능-여부)
  - [4. 할인가 계산](#4-할인가-계산)
  - [5. 등급 판단](#5-등급-판단)
- [회고](#회고)

---

## 변수, 상수 작성

```js
let userName = "전지연";
const absoluteZero = "-273.15°C";
let isLoggedIn = true;
let userAge = 24;
let productPrice = "39,900원";
const backgroundColor = "#121212";
let commentCount = 12;
let currentPage = 3;
let userGrade = "VIP";
let isButtonClicked = false;
```

### 설명

- let과 const를 상황에 맞게 사용했습니다.
- 변수 및 상수명은 **카멜케이스**(userName, isLoggedIn 등)로 작성하였습니다.

## 함수 구현

### 1. 인사말 메시지

```js
function greetUser(userName) {
  return "안녕하세요! " + userName + "님. 좋은 하루되세요!";
}
```

#### 설명

- userName을 매개변수로 받아 인사말을 만들어 반환하는 함수입니다.
- 함수 선언 방식(function)을 사용했습니다.
- 문자열 연결(+)을 통해 사용자 맞춤 인사말을 반환합니다.

#### 출력 예시

```
console.log(greetUser("전지연"));

안녕하세요! 전지연님. 좋은 하루되세요!
```

### 2. 원가 계산

```js
const calculateOriginalPrice = function (priceWithTax) {
  const taxRate = 0.033;
  return priceWithTax / (1 + taxRate);
};
```

#### 설명

- 세금이 포함된 가격에서 세전 금액(원가) 를 계산하는 함수입니다.
- 세금 비율은 3.3%(0.033)로 taxRate에 할당하였고, 1 + taxRate로 나누어 원가를 구합니다.
- 함수 표현식 방식(const 함수명 = function())을 사용했습니다.

#### 출력 예시

```
console.log(calculateOriginalPrice(15000));

14520.81316553727
```

### 3. 주류 판매 가능 여부

```js
const registrationCard = {
  name: "전지연",
  age: 24,
  gender: "여",
};

const canSellAlcohol = (registrationCard) => registrationCard.age >= 19;
```

#### 설명

- registrationCard 객체를 매개변수로 받아, 나이(age)가 19세 이상인지 판단합니다.
- true 또는 false를 반환하며, 주류 판매 가능 여부를 확인합니다.
- 화살표 함수 표현식으로 작성했습니다.

#### 출력 예시

```
console.log(canSellAlcohol(registrationCard));

true
```

### 4. 할인가 계산

```js
const getDiscountedPrice = function (originalPrice, discountPercent) {
  return originalPrice * (1 - discountPercent / 100);
};
```

#### 설명

- 판매가(originalPrice)와 할인율(discountPercent)을 입력 받아 할인가를 계산합니다.
- 할인율은 퍼센트로 입력되며, 100으로 나누어 계산합니다.
- 함수 표현식 방식으로 작성했습니다.

#### 출력 예시

```
console.log(getDiscountedPrice(18700, 20));

14960
```

### 5. 등급 판단

```js
const getGrade = function (score) {
  let grade = "";
  let description = "";

  if (score >= 90 && score <= 100) {
    grade = "A";
    description = "매우 우수";
  } else if (score >= 80) {
    grade = "B";
    description = "우수";
  } else if (score >= 70) {
    grade = "C";
    description = "보통";
  } else if (score >= 60) {
    grade = "D";
    description = "미달, 통과 기준 근접";
  } else {
    grade = "F";
    description = "낙제";
  }

  return { score, grade, description };
};
```

#### 설명

- 입력된 점수(score)에 따라 등급(grade)과 설명(description)을 포함한 객체를 반환합니다.
- 조건문을 통해 점수 범위별 등급을 판단합니다.
- if ~ else if 구조로 작성했고, 범위는 상위 조건부터 처리되므로 충돌이 없습니다.

#### 출력 예시

```
console.log(getGrade(87));

{ "score": 87, "grade": "B", "description": "우수" }
```

## 회고

- 등급 판단하는 함수를 작성할 때, 처음엔 조건문을 `90 <= score <= 100`처럼 썼습니다.
- 그런데 예상과는 다른 값이 나와서 무엇이 잘못되었나 찾아보니 해당 방식은 파이썬에서 쓰이며, 자바스크립트에서는 올바르지 않은 방식이라는 것을 알게 되었습니다.
- 자바스크립트에서는 코드를 왼쪽부터 평가해서, 90 <= score 먼저 계산해서 true 또는 false 반환되고, 그다음으로 true <= 100 또는 false <= 100 계산됩니다. 그리고 true는 1, false는 0으로 변환되기 때문에 항상 true로 동작할 수 있어서 예상과는 다른 결과가 나왔던 것입니다😢
- 자바스크립트는 `score >= 90 && score <= 100`처럼 써야 정확하게 범위를 검사한다는 사실을 깨달을 수 있었습니다.
- 이번 경험을 통해 언어별 문법 차이에 더욱 주의해야겠다는 생각이 들었습니다.
