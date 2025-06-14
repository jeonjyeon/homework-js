// --------------------------------------------------
// ✍ 변수, 상수 작성 과제
// --------------------------------------------------
// 각 항목에 대해 변수나 상수를 선언하고, 알맞은 값을 할당하세요.
// --------------------------------------------------

// 1. 사용자 이름을 저장할 변수를 선언하고 "자신의 이름"을 할당하세요.
let userName = "전지연";

// 2. "절대 영도(온도의 최저 한계)인 -273.15°C"를 담을 상수를 선언하세요.
const absoluteZero = "-273.15°C";

// 3. "로그인 여부"를 확인하는 불리언 타입 변수을 선언하고 적절한값을 할당하세요.
let isLoggedIn = true;

// 4. "사용자 나이" 변수를 선언하고 숫자 값을 할당하세요.
let userAge = 24;

// 5. "상품 가격(예: 39,900원)"을 담는 변수를 작성하세요.
let productPrice = "39,900원";

// 6. 웹 페이지의 "배경색"을 담는 상수를 작성하고 적절한 값을 할당하세요.
const backgroundColor = "#121212";

// 7. 사용자가 작성한 "댓글 수(예: 12)"를 담는 변수를 선언하고 값을 할당하세요.
let commentCount = 12;

// 8. "현재 페이지 번호(예: 3)"를 담는 변수를 작성하고 적절한 값을 할당하세요.
let currentPage = 3;

// 9. "회원 등급('VIP', '골드', '실버' 중 하나)"을 담는 변수를 작성해보세요.
let userGrade = "VIP";

// 10. "버튼이 클릭되었는지 여부"를 담는 변수를 선언하고 불리언 타입 값을 설정하세요.
let isButtonClicked = false;

// --------------------------------------------------
// ✍ 함수 작성 과제
// --------------------------------------------------

// 1. 인사말 메시지
// 사용자로부터 이름을 입력받아 인사말을 출력하는 함수를 작성합니다.
function greetUser(userName) {
  return "안녕하세요! " + userName + "님. 좋은 하루되세요!";
}

console.log(greetUser("전지연"));

// 2. 원가 계산
// 판매가를 입력 받아 원가를 계산하는 함수를 작성합니다.
const calculateOriginalPrice = function (priceWithTax) {
  const taxRate = 0.033;
  return priceWithTax / (1 + taxRate);
};

console.log(calculateOriginalPrice(15_000));

// 3. 주류 판매 가능 여부
// 신분증의 나이를 확인해 주류 구매 가능 여부를 반환하는 함수를 작성합니다.
// 19세 이상 주류 구매가 가능합니다.
const registrationCard = {
  name: "전지연",
  age: 24,
  gender: "여",
};

const canSellAlcohol = (registrationCard) => registrationCard.age >= 19;

console.log(canSellAlcohol(registrationCard));

// 4. 할인가 계산
// 판매가와 할인 비율(%)을 입력 받아, 할인가를 반환하는 함수를 작성합니다.
// [예] 판매가가 18,700원이고, 할인율이 20%인 경우 계산된 할인가는 14,960원입니다.

const getDiscountedPrice = function (originalPrice, discountPercent) {
  return originalPrice * (1 - discountPercent / 100);
};

console.log(getDiscountedPrice(18_700, 20));
